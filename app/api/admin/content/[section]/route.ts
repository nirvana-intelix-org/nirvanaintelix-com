import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { readSection, writeSection } from "@/lib/content/reader";
import { SECTIONS, type SectionName } from "@/lib/content/schema";

export const runtime = "nodejs";

function asSection(raw: string): SectionName | null {
  return (SECTIONS as readonly string[]).includes(raw) ? (raw as SectionName) : null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const name = asSection(section);
  if (!name) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }
  const session = await getSession();
  if (!session.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const content = await readSection(name);
    return NextResponse.json({ section: name, content });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Read failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const name = asSection(section);
  if (!name) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }
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
    await writeSection(name, body);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg =
      e instanceof Error ? e.message : "Validation or write failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
