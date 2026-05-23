"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; at: number }
  | { kind: "error"; message: string };

export default function SectionEditor({
  section,
  initial,
}: {
  section: string;
  initial: string;
}) {
  const router = useRouter();
  const [text, setText] = useState(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [jsonError, setJsonError] = useState<string | null>(null);

  // local JSON parse validation as you type (visual hint only — server still validates)
  useEffect(() => {
    try {
      JSON.parse(text);
      setJsonError(null);
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [text]);

  async function onSave() {
    if (jsonError) return;
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : "Invalid JSON");
      return;
    }

    setStatus({ kind: "saving" });
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({
          kind: "error",
          message: body.error ?? `Save failed (${res.status})`,
        });
        return;
      }
      setStatus({ kind: "saved", at: Date.now() });
      router.refresh();
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Network error",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-ink-line bg-paper-raised">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-line px-4 py-3">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
          /content/{section}.json
        </div>
        <div className="flex items-center gap-3">
          {jsonError && (
            <span className="font-mono text-[11px] text-red-600">
              ⚠ {jsonError}
            </span>
          )}
          {status.kind === "saved" && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-teal">
              ✓ saved
            </span>
          )}
          {status.kind === "error" && (
            <span className="font-mono text-[11px] text-red-600">
              ⚠ {status.message}
            </span>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={status.kind === "saving" || !!jsonError}
            className="btn-primary"
          >
            {status.kind === "saving" ? "Saving…" : "Save & publish"}
          </button>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="block h-[68vh] w-full resize-none rounded-b-2xl bg-paper-raised p-5 font-mono text-[13px] leading-relaxed text-ink outline-none"
      />
    </div>
  );
}
