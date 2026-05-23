import type { Metadata } from "next";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin · Nirvana Intelix",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const loggedIn = !!session.loggedIn;

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-ink-line bg-paper-raised/80 backdrop-blur">
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
              className="hidden font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink md:inline"
            >
              View live site ↗
            </a>
            {loggedIn && (
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
                >
                  Sign out
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      {loggedIn ? (
        <div className="md:flex">
          <AdminSidebar />
          <main className="min-w-0 flex-1 px-5 py-8 md:px-10">
            {children}
          </main>
        </div>
      ) : (
        <main className="container-px py-10">{children}</main>
      )}
    </div>
  );
}
