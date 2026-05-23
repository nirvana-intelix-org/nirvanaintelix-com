import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { SECTIONS } from "@/lib/content/schema";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<string, { label: string; desc: string }> = {
  hero: {
    label: "Hero",
    desc: "Headline, pills, body copy, CTAs, stats and marquee items.",
  },
  about: {
    label: "Studio (About)",
    desc: "Pull quote, paragraphs and the four principles bento.",
  },
  capabilities: {
    label: "Capabilities",
    desc: "The 8-card grid of capability categories.",
  },
  projects: {
    label: "Products",
    desc: "Live products — flagship + the rest, with screenshots and tags.",
  },
  contact: {
    label: "Contact",
    desc: "Headline, body, email + the vitals card.",
  },
};

export default async function AdminHome() {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">Manage content</h1>
      <p className="text-body mt-3 max-w-2xl">
        Edit any section. Changes go live the moment you save — the public
        site reads from the same database.
      </p>

      <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
        {SECTIONS.map((name) => {
          const meta = SECTION_LABELS[name];
          return (
            <li key={name} className="bg-paper">
              <Link
                href={`/admin/${name}`}
                className="group block p-6 transition hover:bg-paper-raised"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                    {name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-copper opacity-0 transition group-hover:opacity-100">
                    edit →
                  </span>
                </div>
                <div className="mt-2 font-serif text-2xl text-ink">
                  {meta.label}
                </div>
                <div className="mt-1 text-sm text-ink-muted">{meta.desc}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
