"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PagesTableActions({
  id,
  slug,
  published,
}: {
  id: string;
  slug: string;
  published: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<null | "duplicating" | "deleting">(null);

  async function onDuplicate() {
    if (busy) return;
    setBusy("duplicating");
    try {
      const res = await fetch(`/api/admin/pages/${id}/duplicate`, {
        method: "POST",
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(body.error ?? `Duplicate failed (${res.status})`);
        setBusy(null);
        return;
      }
      router.push(`/admin/pages/${body.page.id}`);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Network error");
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center justify-end gap-3">
      {published && (
        <a
          href={`/${slug}`}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
        >
          View ↗
        </a>
      )}
      <button
        type="button"
        onClick={onDuplicate}
        disabled={busy !== null}
        className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink disabled:opacity-40"
      >
        {busy === "duplicating" ? "Duplicating…" : "Duplicate"}
      </button>
      <Link
        href={`/admin/pages/${id}`}
        className="font-mono text-[11px] uppercase tracking-wider text-copper hover:text-ink"
      >
        Edit →
      </Link>
    </div>
  );
}
