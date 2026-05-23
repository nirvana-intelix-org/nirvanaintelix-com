import { redirect, notFound } from "next/navigation";
import SectionEditor from "./SectionEditor";
import { getSession } from "@/lib/auth/session";
import { readSection } from "@/lib/content/reader";
import {
  SECTIONS,
  SECTION_LABELS,
  type SectionName,
} from "@/lib/content/schema";

export const dynamic = "force-dynamic";

const SECTION_HINTS: Record<SectionName, string> = {
  header: "Brand mark, nav links and the top-right CTA.",
  hero: "Headline, pills, body copy, CTAs, stats and marquee items.",
  about: "Pull quote, paragraphs and the four principles bento.",
  capabilities: "The 8-card grid of capability categories.",
  projects: "Live products — flagship + the rest, with screenshots and tags.",
  contact: "Headline, body, email and the vitals card.",
  footer: "Copyright line — use {year} for the current year.",
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }

  const { section } = await params;
  if (!(SECTIONS as readonly string[]).includes(section)) {
    notFound();
  }
  const name = section as SectionName;
  const content = await readSection(name);

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">{SECTION_LABELS[name]}</h1>
      <p className="text-body mt-2 max-w-2xl text-sm">{SECTION_HINTS[name]}</p>

      <div className="mt-6">
        <SectionEditor
          section={name}
          initial={JSON.stringify(content, null, 2)}
        />
      </div>
    </div>
  );
}
