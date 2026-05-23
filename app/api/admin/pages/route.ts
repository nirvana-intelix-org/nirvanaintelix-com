import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { listPages, createPage } from "@/lib/content/pages";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await listPages();
  return NextResponse.json({ pages: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  try {
    const row = await createPage(body);
    return NextResponse.json({ ok: true, page: row });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Create failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
