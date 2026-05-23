"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, SECTION_LABELS } from "@/lib/content/schema";

export default function AdminSidebar() {
  const pathname = usePathname();
  const activeSection = (() => {
    const m = pathname.match(/^\/admin\/([a-z]+)(?:\/|$)/);
    if (m && (SECTIONS as readonly string[]).includes(m[1])) return m[1];
    return null;
  })();
  const pagesActive = pathname.startsWith("/admin/pages");

  return (
    <aside
      aria-label="Admin sections"
      className="border-ink-line bg-paper-raised/40 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-64 md:flex-shrink-0 md:border-r"
    >
      {/* Mobile: horizontal scrolling pill strip */}
      <div className="container-px scrollbar-none flex gap-1 overflow-x-auto border-b border-ink-line bg-paper py-2 md:hidden">
        <Link
          href="/admin/pages"
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
            pagesActive
              ? "border-copper/40 bg-copper/10 text-ink"
              : "border-ink-line text-ink-muted hover:bg-paper-raised hover:text-ink"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
            new
          </span>
          Pages
        </Link>
        {SECTIONS.map((name) => {
          const isActive = name === activeSection;
          return (
            <Link
              key={name}
              href={`/admin/${name}`}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
                isActive
                  ? "border-copper/40 bg-copper/10 text-ink"
                  : "border-ink-line text-ink-muted hover:bg-paper-raised hover:text-ink"
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                {name.slice(0, 3)}
              </span>
              {SECTION_LABELS[name]}
            </Link>
          );
        })}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden h-full flex-col md:flex">
        {/* Pages group */}
        <div className="px-6 pb-2 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            Pages
          </div>
        </div>
        <nav className="flex flex-col gap-px px-3 pb-2">
          <Link
            href="/admin/pages"
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              pagesActive
                ? "bg-paper text-ink shadow-sm"
                : "text-ink-muted hover:bg-paper hover:text-ink"
            }`}
          >
            {pagesActive && (
              <span className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-copper" />
            )}
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${
                pagesActive ? "text-copper" : "text-ink-dim"
              }`}
            >
              all
            </span>
            <span className="font-medium">All pages</span>
          </Link>
          <Link
            href="/admin/pages/new"
            className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-muted transition hover:bg-paper hover:text-ink"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-copper">
              +
            </span>
            <span>New page</span>
          </Link>
        </nav>

        {/* Homepage sections group */}
        <div className="mt-4 px-6 pb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            Homepage sections
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-px px-3 pb-6">
          {SECTIONS.map((name) => {
            const isActive = name === activeSection;
            return (
              <Link
                key={name}
                href={`/admin/${name}`}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-paper text-ink shadow-sm"
                    : "text-ink-muted hover:bg-paper hover:text-ink"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-copper" />
                )}
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider ${
                    isActive ? "text-copper" : "text-ink-dim"
                  }`}
                >
                  {name.slice(0, 3)}
                </span>
                <span className="font-medium">{SECTION_LABELS[name]}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-ink-line px-6 py-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-wider text-ink-muted hover:text-ink"
          >
            View live site ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
