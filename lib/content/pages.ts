import { eq, desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { pages } from "@/lib/db/schema";
import { pageSchema, isReservedSlug, type PageInput } from "./blocks";

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "").toLowerCase();
}

export async function listPages() {
  return getDb()
    .select()
    .from(pages)
    .orderBy(desc(pages.updatedAt));
}

export async function getPageById(id: string) {
  const rows = await getDb()
    .select()
    .from(pages)
    .where(eq(pages.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getPageBySlug(slug: string) {
  const clean = normalizeSlug(slug);
  const rows = await getDb()
    .select()
    .from(pages)
    .where(eq(pages.slug, clean))
    .limit(1);
  return rows[0] ?? null;
}

export async function createPage(input: unknown) {
  const valid = pageSchema.parse(input) as PageInput;
  const slug = normalizeSlug(valid.slug);
  if (isReservedSlug(slug)) {
    throw new Error(`Slug "${slug}" is reserved by the system`);
  }
  const [row] = await getDb()
    .insert(pages)
    .values({
      slug,
      title: valid.title,
      description: valid.description,
      blocks: valid.blocks,
      published: valid.published,
    })
    .returning();
  return row;
}

export async function updatePage(id: string, input: unknown) {
  const valid = pageSchema.parse(input) as PageInput;
  const slug = normalizeSlug(valid.slug);
  if (isReservedSlug(slug)) {
    throw new Error(`Slug "${slug}" is reserved by the system`);
  }
  const [row] = await getDb()
    .update(pages)
    .set({
      slug,
      title: valid.title,
      description: valid.description,
      blocks: valid.blocks,
      published: valid.published,
      updatedAt: new Date(),
    })
    .where(eq(pages.id, id))
    .returning();
  return row ?? null;
}

export async function deletePage(id: string) {
  await getDb().delete(pages).where(eq(pages.id, id));
}
