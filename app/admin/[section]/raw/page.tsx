import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import SectionEditor from "../SectionEditor";
import { getSession } from "@/lib/auth/session";
import { readSection } from "@/lib/content/reader";
import {
  SECTIONS,
  SECTION_LABELS,
  type SectionName,
} from "@/lib/content/schema";

export const dynamic = "force-dynamic";

export default async function RawSectionPage({
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
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-ink">
            {SECTION_LABELS[name]}
            <span className="ml-3 font-mono text-xs uppercase tracking-wider text-ink-dim">
              raw json
            </span>
          </h1>
          <p className="text-body mt-2 max-w-2xl text-sm">
            Edit the raw JSON. Schema is enforced on save — invalid changes are
            rejected.
          </p>
        </div>
        <Link
          href={`/admin/${name}`}
          className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
        >
          ← Back to form view
        </Link>
      </div>

      <div className="mt-6">
        <SectionEditor
          section={name}
          initial={JSON.stringify(content, null, 2)}
        />
      </div>
    </div>
  );
}
