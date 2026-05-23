"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SaveBar, { type SaveStatus } from "@/components/admin/fields/SaveBar";
import {
  TextField,
  TextAreaField,
  ToggleField,
} from "@/components/admin/fields/primitives";
import BlockList from "@/components/admin/forms/blocks/BlockList";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import type { PageInput } from "@/lib/content/blocks";

type Mode = "edit" | "preview";

export default function PageEditor({
  id,
  initial,
}: {
  id: string;
  initial: PageInput;
}) {
  const router = useRouter();
  const [value, setValue] = useState<PageInput>(initial);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });
  const [deleting, setDeleting] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [mode, setMode] = useState<Mode>("edit");

  const patch = useCallback((p: Partial<PageInput>) => {
    setValue((v) => ({ ...v, ...p }));
    setDirty(true);
    setStatus({ kind: "idle" });
  }, []);

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: body.error ?? `Save failed (${res.status})`,
        });
        return;
      }
      setStatus({ kind: "saved", at: Date.now() });
      setDirty(false);
      router.refresh();
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Network error",
      });
    }
  }

  async function onDuplicate() {
    setDuplicating(true);
    try {
      const res = await fetch(`/api/admin/pages/${id}/duplicate`, {
        method: "POST",
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(body.error ?? `Duplicate failed (${res.status})`);
        setDuplicating(false);
        return;
      }
      router.push(`/admin/pages/${body.page.id}`);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Network error");
      setDuplicating(false);
    }
  }

  async function onDelete() {
    if (!window.confirm(`Delete page "/${value.slug}"? This cannot be undone.`))
      return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.error ?? `Delete failed (${res.status})`);
        setDeleting(false);
        return;
      }
      router.replace("/admin/pages");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Network error");
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link
            href="/admin/pages"
            className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
          >
            ← All pages
          </Link>
          <h1 className="mt-3 font-serif text-4xl text-ink">
            {value.title || "(untitled)"}
          </h1>
          <div className="mt-1 font-mono text-sm text-ink-muted">
            /{value.slug}
            {!value.published && (
              <span className="ml-3 rounded-full bg-ink-line/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                Draft
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Edit / Preview toggle */}
          <div className="inline-flex overflow-hidden rounded-full border border-ink-line bg-paper text-[11px] font-mono uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`px-4 py-1.5 transition ${
                mode === "edit"
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:bg-paper-raised"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`px-4 py-1.5 transition ${
                mode === "preview"
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:bg-paper-raised"
              }`}
            >
              Preview
            </button>
          </div>
          {value.published && (
            <a
              href={`/${value.slug}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
            >
              View live ↗
            </a>
          )}
          <button
            type="button"
            onClick={onDuplicate}
            disabled={duplicating}
            className="rounded-full border border-ink-line bg-paper px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-soft transition hover:bg-paper-raised disabled:opacity-50"
          >
            {duplicating ? "Duplicating…" : "Duplicate"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="rounded-full border border-red-300 bg-red-50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-red-700 transition hover:bg-red-100 disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>

      {mode === "edit" ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-ink-line bg-paper-raised p-5">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
              Page metadata
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Slug"
                  hint="Lowercase letters, numbers, hyphens, slashes"
                  value={value.slug}
                  onChange={(slug) => patch({ slug })}
                />
                <TextField
                  label="Title"
                  value={value.title}
                  onChange={(title) => patch({ title })}
                />
              </div>
              <TextAreaField
                label="Meta description"
                rows={2}
                value={value.description}
                onChange={(description) => patch({ description })}
              />
              <ToggleField
                label="Published"
                hint="When off, the page returns 404 publicly"
                value={value.published}
                onChange={(published) => patch({ published })}
              />
            </div>
          </div>

          <BlockList
            blocks={value.blocks}
            onChange={(blocks) => patch({ blocks })}
          />

          <SaveBar status={status} dirty={dirty} onSave={save} />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-line bg-paper">
          <div className="flex items-center justify-between border-b border-ink-line bg-paper-raised px-4 py-2.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
              Live preview · /{value.slug || "(no slug)"}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-copper">
              {dirty ? "unsaved" : "synced"}
            </div>
          </div>
          {value.blocks.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="font-serif text-2xl text-ink">
                Nothing to preview
              </div>
              <p className="text-body mt-2 text-sm">
                Switch back to <span className="text-ink">Edit</span> and add a
                block.
              </p>
            </div>
          ) : (
            <div className="bg-paper">
              <BlockRenderer blocks={value.blocks} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
