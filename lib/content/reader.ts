import { promises as fs } from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { sections } from "@/lib/db/schema";
import {
  sectionSchemas,
  SECTIONS,
  type SectionName,
  type Header,
  type Footer,
  type Hero,
  type About,
  type Capabilities,
  type Projects,
  type Contact,
} from "./schema";

const REPO_CONTENT_DIR = path.join(process.cwd(), "content");

async function readRepoJson(name: SectionName): Promise<unknown> {
  const file = path.join(REPO_CONTENT_DIR, `${name}.json`);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}

async function loadSection<T>(name: SectionName): Promise<T> {
  const rows = await getDb()
    .select()
    .from(sections)
    .where(eq(sections.name, name))
    .limit(1);

  const data = rows[0]?.content ?? (await readRepoJson(name));
  return sectionSchemas[name].parse(data) as T;
}

export const getHeader = () => loadSection<Header>("header");
export const getFooter = () => loadSection<Footer>("footer");
export const getHero = () => loadSection<Hero>("hero");
export const getAbout = () => loadSection<About>("about");
export const getCapabilities = () => loadSection<Capabilities>("capabilities");
export const getProjects = () => loadSection<Projects>("projects");
export const getContact = () => loadSection<Contact>("contact");

export async function readSection(name: SectionName): Promise<unknown> {
  return loadSection(name);
}

export async function writeSection(
  name: SectionName,
  data: unknown
): Promise<void> {
  const valid = sectionSchemas[name].parse(data);
  await getDb()
    .insert(sections)
    .values({ name, content: valid })
    .onConflictDoUpdate({
      target: sections.name,
      set: { content: valid, updatedAt: new Date() },
    });
}

export async function seedIfEmpty(): Promise<{ seeded: SectionName[] }> {
  const existing = await getDb().select({ name: sections.name }).from(sections);
  const have = new Set(existing.map((r) => r.name));
  const seeded: SectionName[] = [];
  for (const name of SECTIONS) {
    if (!have.has(name)) {
      const data = await readRepoJson(name);
      const valid = sectionSchemas[name].parse(data);
      await getDb().insert(sections).values({ name, content: valid });
      seeded.push(name);
    }
  }
  return { seeded };
}
