"use client";

import { useEffect, useState } from "react";
import type { Header } from "@/lib/content/schema";

export default function NavClient({ header }: { header: Header }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-line bg-paper/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a href={header.brandHref} className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink font-serif text-sm text-paper">
            {header.brandMark}
          </span>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
              {header.eyebrow}
            </div>
            <div className="font-serif text-lg leading-none tracking-tight text-ink">
              {header.brandName}
            </div>
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {header.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-ink-soft transition hover:bg-paper-raised"
              >
                <span className="font-mono text-[10px] text-ink-dim transition group-hover:text-copper">
                  {l.n}
                </span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={header.cta.href} className="btn-primary hidden md:inline-flex">
          {header.cta.showDot && (
            <span className="h-1.5 w-1.5 rounded-full bg-paper" />
          )}
          {header.cta.label}
        </a>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-ink-soft hover:bg-paper-raised md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-line bg-paper/95 backdrop-blur-xl md:hidden">
          <ul className="container-px flex flex-col gap-1 py-3">
            {header.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink hover:bg-paper-raised"
                >
                  <span className="font-mono text-[10px] text-ink-dim">
                    {l.n}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
