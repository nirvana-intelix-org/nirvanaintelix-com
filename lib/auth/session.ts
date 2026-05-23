import "server-only";
import {
  getIronSession,
  type IronSession,
  type SessionOptions,
} from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  loggedIn: boolean;
  loggedInAt?: number;
};

function getPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p || p.length < 8) {
    throw new Error(
      "ADMIN_PASSWORD env var is missing or too short (min 8 chars)."
    );
  }
  return p;
}

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "SESSION_SECRET env var is missing or too short (min 32 chars)."
    );
  }
  return s;
}

const sessionOptions: SessionOptions = {
  password: "", // set per-call from env so missing config errors loudly
  cookieName: "nirvanaintelix_admin",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8h
    path: "/",
  },
};

export async function getSession(): Promise<IronSession<AdminSession>> {
  const cookieStore = await cookies();
  return getIronSession<AdminSession>(cookieStore, {
    ...sessionOptions,
    password: getSecret(),
  });
}

export async function verifyAdminPassword(input: string): Promise<boolean> {
  const expected = getPassword();
  if (input.length !== expected.length) return false;
  let same = 0;
  for (let i = 0; i < expected.length; i++) {
    same |= expected.charCodeAt(i) ^ input.charCodeAt(i);
  }
  return same === 0;
}

export async function requireAdmin(): Promise<void> {
  const session = await getSession();
  if (!session.loggedIn) {
    throw new Error("Unauthorized");
  }
}
