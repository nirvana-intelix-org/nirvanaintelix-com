"use client";

import Link from "next/link";

export type SaveStatus =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; at: number }
  | { kind: "error"; message: string };

export default function SaveBar({
  status,
  dirty,
  onSave,
  rawHref,
}: {
  status: SaveStatus;
  dirty: boolean;
  onSave: () => void;
  rawHref?: string;
}) {
  return (
    <div className="sticky bottom-4 z-20 mt-8">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-ink-line bg-paper-raised/95 px-5 py-3 shadow-lg backdrop-blur">
        <div className="min-w-0 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          {status.kind === "saving" && "saving…"}
          {status.kind === "saved" && (
            <span className="text-teal">✓ saved — live now</span>
          )}
          {status.kind === "error" && (
            <span className="truncate text-red-600">⚠ {status.message}</span>
          )}
          {status.kind === "idle" && (dirty ? "unsaved changes" : "all saved")}
        </div>
        <div className="flex items-center gap-3">
          {rawHref && (
            <Link
              href={rawHref}
              className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
            >
              Edit as JSON →
            </Link>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={status.kind === "saving" || !dirty}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status.kind === "saving" ? "Saving…" : "Save & publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
