import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin · Nirvana Intelix",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink-line bg-paper-raised/60 backdrop-blur-sm">
        <div className="container-px flex h-14 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-ink font-serif text-xs text-paper">
              NI
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
              Admin · Nirvana Intelix
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
            >
              View live site ↗
            </a>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-px py-10">{children}</main>
    </div>
  );
}
