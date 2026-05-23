#!/bin/bash
# Server-side deploy script for nirvanaintelix.com
# Cloned on the server; called by the GitHub Action.

set -e

TENANT=nirvanaintelix-com
DOMAIN=nirvanaintelix.com
REPO=https://github.com/nirvana-intelix-org/nirvanaintelix-com.git
SRC=/var/www/cloudsites-${TENANT}
WEBROOT=/var/www/${DOMAIN}
NGINX_CONF=/etc/nginx/sites-available/${DOMAIN}.conf

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

echo ">> 2. npm install"
npm install --no-audit --no-fund

echo ">> 3. Build static export"
npm run build

echo ">> 4. Publish to ${WEBROOT}"
mkdir -p ${WEBROOT}
rsync -a --delete ${SRC}/out/ ${WEBROOT}/
chown -R www-data:www-data ${WEBROOT}

echo ">> 5. Write/refresh nginx server block"
cat > ${NGINX_CONF} <<'EOF'
# nirvanaintelix.com — served from /var/www/nirvanaintelix.com
# Cloudflare proxies HTTPS and may forward HTTP; both paths handled.
server {
  listen 80;
  server_name nirvanaintelix.com www.nirvanaintelix.com;

  root /var/www/nirvanaintelix.com;
  index index.html;

  location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }

  location / {
    try_files $uri $uri.html $uri/index.html =404;
  }

  error_page 404 /404.html;
}
EOF
ln -sf ${NGINX_CONF} /etc/nginx/sites-enabled/${DOMAIN}.conf

echo ">> 6. Test + reload nginx"
nginx -t
systemctl reload nginx

echo ">> 7. Verify"
curl -sI -H "Host: ${DOMAIN}" http://127.0.0.1/ | head -3
echo ""
echo "Deployed: https://${DOMAIN}"
