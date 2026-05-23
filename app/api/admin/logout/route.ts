import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  const session = await getSession();
  await session.destroy();
  return NextResponse.json({ ok: true });
}
