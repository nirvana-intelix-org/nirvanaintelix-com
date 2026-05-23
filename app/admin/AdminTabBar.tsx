"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, SECTION_LABELS } from "@/lib/content/schema";

export default function AdminTabBar() {
  const pathname = usePathname();
  // active section from /admin/<section>; default to first section on /admin
  const active = (() => {
    const m = pathname.match(/^\/admin\/([a-z]+)$/);
    if (m && (SECTIONS as readonly string[]).includes(m[1])) {
      return m[1];
    }
    return null;
  })();

  return (
    <nav className="border-t border-ink-line bg-paper">
      <div className="container-px scrollbar-none flex gap-px overflow-x-auto">
        {SECTIONS.map((name) => {
          const isActive = name === active;
          return (
            <Link
              key={name}
              href={`/admin/${name}`}
              className={`relative inline-flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm transition ${
                isActive
                  ? "text-ink"
                  : "text-ink-muted hover:bg-paper-raised hover:text-ink"
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  isActive ? "text-copper" : "text-ink-dim"
                }`}
              >
                {name}
              </span>
              {SECTION_LABELS[name]}
              {isActive && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-t-full bg-copper" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
