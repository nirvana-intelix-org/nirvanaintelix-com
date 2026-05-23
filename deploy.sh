#!/bin/bash
# Server-side deploy script for nirvanaintelix.com
# Runs Next.js as a long-lived PM2 process behind an nginx reverse proxy.
# Loads runtime secrets (DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET) from
# /etc/nirvanaintelix-com.env which lives OUTSIDE the repo and is never
# overwritten by deploys.

set -e

TENANT=nirvanaintelix-com
DOMAIN=nirvanaintelix.com
REPO=https://github.com/nirvana-intelix-org/nirvanaintelix-com.git
SRC=/var/www/cloudsites-${TENANT}
NGINX_CONF=/etc/nginx/sites-available/${DOMAIN}.conf
ENV_FILE=/etc/nirvanaintelix-com.env
PM2_NAME=cloudsites-${TENANT}-prod
PORT=3002
UPLOAD_DIR=/var/www/nirvanaintelix-uploads

# === 0. Sanity: env file must exist ===
if [ ! -f "${ENV_FILE}" ]; then
  echo "❌ ${ENV_FILE} missing — create it with DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET, then re-run."
  exit 1
fi

# Ensure UPLOAD_DIR is set in env (admin image upload destination, served by nginx via /uploads/)
if ! grep -q "^UPLOAD_DIR=" "${ENV_FILE}"; then
  echo "UPLOAD_DIR=${UPLOAD_DIR}" >> "${ENV_FILE}"
fi

# Ensure upload dir exists with safe perms
mkdir -p "${UPLOAD_DIR}"
chown -R root:root "${UPLOAD_DIR}"
chmod 755 "${UPLOAD_DIR}"

# === 1. Clone or update repo ===
echo ">> 1. Clone or update repo"
mkdir -p /var/www
if [ -d "${SRC}/.git" ]; then
  cd ${SRC}
  git fetch origin main
  git reset --hard origin/main
else
  git clone ${REPO} ${SRC}
  cd ${SRC}
fi

# === 2. Install + build ===
echo ">> 2. npm install"
npm install --no-audit --no-fund
echo ">> 3. Build Next.js"
npm run build

# === 3. Apply DB schema + seed if empty ===
echo ">> 4. Push DB schema"
set -a
. "${ENV_FILE}"
set +a
npx drizzle-kit push --force
echo ">> 5. Seed missing sections"
npm run db:seed

# === 4. PM2 process ===
echo ">> 6. (Re)start PM2"
if pm2 describe ${PM2_NAME} > /dev/null 2>&1; then
  pm2 restart ${PM2_NAME} --update-env
else
  pm2 start npm --name ${PM2_NAME} \
    --cwd ${SRC} \
    --update-env \
    -- start
fi
pm2 save

# === 5. Nginx reverse proxy (replaces previous static-files block) ===
echo ">> 7. Write/refresh nginx server block"
cat > ${NGINX_CONF} <<EOF
# HTTP — for Cloudflare Flexible mode + direct origin-IP testing
server {
  listen 80;
  server_name nirvanaintelix.com www.nirvanaintelix.com;
  return 301 https://\$host\$request_uri;
}

# HTTPS — for Cloudflare Full mode (CF -> origin uses 443).
# Cert is the existing webziq.com Let's Encrypt cert. CF Full mode
# accepts this (cert hostname mismatch is fine — only strict mode
# would reject). Replace with a real cert here if you switch CF to
# Full (strict).
server {
  listen 443 ssl http2;
  server_name nirvanaintelix.com www.nirvanaintelix.com;

  ssl_certificate     /etc/letsencrypt/live/webziq.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/webziq.com/privkey.pem;

  client_max_body_size 6m;

  # Admin-uploaded images live outside the build dir so they survive deploys.
  location /uploads/ {
    alias ${UPLOAD_DIR}/;
    expires 30d;
    add_header Cache-Control "public, max-age=2592000";
    try_files \$uri =404;
  }

  location / {
    proxy_pass http://127.0.0.1:${PORT};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
EOF
ln -sf ${NGINX_CONF} /etc/nginx/sites-enabled/${DOMAIN}.conf

echo ">> 8. Test + reload nginx"
nginx -t
systemctl reload nginx

# === 6. Verify ===
echo ""
echo "--- Local request via Host header ---"
curl -sI -H "Host: ${DOMAIN}" "http://127.0.0.1/" | head -3
echo ""
echo "✅ Deployed: https://${DOMAIN}"
echo "   Admin:   https://${DOMAIN}/admin"
