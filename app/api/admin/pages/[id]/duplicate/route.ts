import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { duplicatePage } from "@/lib/content/pages";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const row = await duplicatePage(id);
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, page: row });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Duplicate failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
