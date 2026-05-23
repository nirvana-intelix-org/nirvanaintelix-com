import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found · Nirvana Intelix",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="copper-glow -top-40 -right-40" />
      <div className="teal-glow bottom-0 left-0" />

      <div className="relative z-[2] mx-auto max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
          Error · 404
        </div>
        <h1 className="display mt-6 text-[clamp(3.5rem,12vw,8rem)]">
          Lost <span className="italic text-copper">in transit</span>.
        </h1>
        <p className="text-body mx-auto mt-6 max-w-md text-base md:text-lg">
          That page isn&apos;t at this address. It might have moved, or maybe
          it never existed. The products below are still live, though.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/#products" className="btn-ghost">
            See our products
          </Link>
        </div>

        <div className="mt-16 border-t border-ink-line pt-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
            Nirvana Intelix · Product studio for MENA
          </div>
        </div>
      </div>
    </main>
  );
}
