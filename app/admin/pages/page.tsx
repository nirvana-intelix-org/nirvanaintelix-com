import { redirect } from "next/navigation";
import Link from "next/link";
import PagesTableActions from "./PagesTableActions";
import { getSession } from "@/lib/auth/session";
import { listPages } from "@/lib/content/pages";

export const dynamic = "force-dynamic";

export default async function PagesList() {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }

  const pages = await listPages();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-ink">Pages</h1>
          <p className="text-body mt-2 text-sm">
            Create and publish standalone pages at <code className="font-mono text-ink">/your-slug</code>.
            Compose them from text, headings, images, sliders, HTML and CTAs.
          </p>
        </div>
        <Link href="/admin/pages/new" className="btn-primary">
          + New page
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line bg-paper-raised">
        {pages.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="font-serif text-2xl text-ink">No pages yet</div>
            <p className="text-body mt-2 text-sm">
              Click <span className="text-ink">+ New page</span> to create your first one.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-ink-line bg-paper">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-ink-line last:border-b-0 hover:bg-paper"
                >
                  <td className="px-5 py-3 font-mono text-sm text-ink">/{p.slug}</td>
                  <td className="px-5 py-3 text-sm text-ink">{p.title}</td>
                  <td className="px-5 py-3">
                    {p.published ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-line/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-ink-muted">
                    {new Date(p.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <PagesTableActions
                      id={p.id}
                      slug={p.slug}
                      published={p.published}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
