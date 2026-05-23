import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import SectionEditor from "./SectionEditor";
import { getSession } from "@/lib/auth/session";
import { readSection } from "@/lib/content/reader";
import { SECTIONS, type SectionName } from "@/lib/content/schema";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<SectionName, string> = {
  hero: "Hero",
  about: "Studio (About)",
  capabilities: "Capabilities",
  projects: "Products",
  contact: "Contact",
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
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
        >
          ← All sections
        </Link>
      </div>
      <h1 className="mt-4 font-serif text-4xl text-ink">
        {SECTION_LABELS[name]}
      </h1>
      <p className="text-body mt-2 text-sm">
        Edit the JSON below. Schema is enforced on save — invalid changes are
        rejected with a clear error.
      </p>

      <div className="mt-8">
        <SectionEditor
          section={name}
          initial={JSON.stringify(content, null, 2)}
        />
      </div>
    </div>
  );
}
