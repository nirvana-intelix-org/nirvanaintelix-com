import { NextResponse } from "next/server";
import { getSession, verifyAdminPassword } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }
  const ok = await verifyAdminPassword(body.password);
  if (!ok) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const session = await getSession();
  session.loggedIn = true;
  session.loggedInAt = Date.now();
  await session.save();
  return NextResponse.json({ ok: true });
}
