"use client";

import { useEffect, useRef, useState } from "react";
import type { Hero } from "@/lib/content/schema";

type LiveProduct = {
  name: string;
  tag: string;
  swatch: string;
  flag: boolean;
};

type Props = {
  hero: Hero;
  liveProducts: LiveProduct[];
};

export default function HeroClient({ hero, liveProducts }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden border-b border-ink-line pt-24 md:pt-28"
    >
      <div className="copper-glow -top-40 -right-40" />
      <div className="teal-glow top-20 left-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 20%), rgba(189,90,26,0.10), transparent 65%)",
        }}
      />

      <div className="container-px relative pb-16 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div
              className={`flex flex-wrap items-center gap-2 transition-all duration-700 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="pill pill-teal">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-teal" />
                {hero.pillTeal}
              </span>
              <span className="pill">{hero.pillCorner}</span>
            </div>

            <h1
              className={`mt-6 font-serif font-normal leading-[0.95] tracking-tightest text-ink text-[clamp(2.8rem,7.5vw,5.6rem)] transition-all delay-100 duration-700 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {hero.headlineLead}
              <br />
              <span className="relative inline-block italic text-copper">
                {hero.headlineEm}
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    className="text-copper/60"
                  />
                </svg>
              </span>
              {hero.headlineTrail}
            </h1>

            <p
              className={`text-body mt-6 max-w-xl text-base leading-relaxed md:mt-8 md:text-lg transition-all delay-200 duration-700 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {hero.body}
            </p>

            <div
              className={`mt-8 flex flex-wrap items-center gap-3 transition-all delay-300 duration-700 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <a href={hero.ctaPrimaryHref} className="btn-primary group/cta">
                {hero.ctaPrimary}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <a href={hero.ctaGhostHref} className="btn-ghost">
                {hero.ctaGhost}
              </a>
            </div>
          </div>

          <div
            className={`lg:col-span-5 transition-all delay-200 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <LiveProductsBento products={liveProducts} />
          </div>
        </div>

        <Stats items={hero.stats} />
      </div>

      <Marquee items={hero.marqueeItems} />
    </section>
  );
}

function LiveProductsBento({ products }: { products: LiveProduct[] }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-4 rounded-[28px] border border-copper/15 bg-gradient-to-br from-copper/[0.04] to-transparent" />

      <div className="relative overflow-hidden rounded-2xl border border-ink-line bg-paper-raised/90 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between border-b border-ink-line bg-paper px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-blink rounded-full bg-teal" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              Live in production · {products.length} products
            </span>
          </div>
          <a
            href="#products"
            className="font-mono text-[10px] uppercase tracking-wider text-copper transition hover:text-ink"
          >
            view all →
          </a>
        </div>

        <div className="grid grid-cols-3 gap-px bg-ink-line">
          {products.map((p) => (
            <a
              key={p.name}
              href="#products"
              className="group/p relative flex flex-col items-center justify-center gap-2 bg-paper-raised p-3 text-center transition hover:bg-paper sm:flex-row sm:items-center sm:gap-2.5 sm:text-left sm:p-4"
            >
              <span
                className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br ${p.swatch} font-serif text-xs text-white shadow-sm transition-transform group-hover/p:scale-110 group-hover/p:rotate-3`}
              >
                {p.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <div className="truncate text-xs font-medium text-ink sm:text-sm">
                  {p.name}
                </div>
                <div className="truncate font-mono text-[9px] uppercase tracking-wider text-ink-dim">
                  {p.tag}
                </div>
              </div>
              {p.flag && (
                <span className="absolute top-2 right-2 inline-flex h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_0_3px_rgba(189,90,26,0.15)]" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-line bg-paper px-4 py-2.5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Powered by Webziq
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-teal">
              All systems live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stats({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:mt-20 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.v} className="bg-paper p-5 md:p-6">
          <div className="font-serif text-3xl text-ink md:text-4xl">{s.k}</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
            {s.v}
          </div>
        </div>
      ))}
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="border-y border-ink-line bg-paper-raised/60 py-5">
      <div className="group/marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
        <div className="flex w-max animate-marquee gap-12 group-hover/marquee:[animation-play-state:paused]">
          {row.map((t, i) => (
            <div
              key={`${t}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <span className="h-1 w-1 rounded-full bg-copper" />
              <span className="font-serif text-2xl italic text-ink-muted transition hover:text-ink">
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
