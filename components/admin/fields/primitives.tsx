"use client";

import { useEffect, useId, useState } from "react";

const inputBase =
  "block w-full rounded-lg border border-ink-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/15";

export function FieldLabel({
  children,
  hint,
  htmlFor,
}: {
  children: React.ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
        {children}
      </span>
      {hint && <span className="ml-2 text-[11px] text-ink-muted">{hint}</span>}
    </label>
  );
}

export function TextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "url" | "email" | "password";
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputBase} mt-2`}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  hint,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputBase} mt-2 resize-y leading-relaxed`}
      />
    </div>
  );
}

export function ToggleField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-ink-line bg-paper p-3">
      <FieldLabel htmlFor={id} hint={hint}>
        {label}
      </FieldLabel>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition ${
          value ? "bg-copper" : "bg-ink-line"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function StringArrayField({
  label,
  hint,
  values,
  onChange,
  itemPlaceholder,
  addLabel = "Add item",
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (v: string[]) => void;
  itemPlaceholder?: string;
  addLabel?: string;
}) {
  function update(i: number, v: string) {
    const next = values.slice();
    next[i] = v;
    onChange(next);
  }
  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...values, ""]);
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <ul className="mt-2 space-y-2">
        {values.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-6 flex-shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
              {String(i + 1).padStart(2, "0")}
            </span>
            <input
              type="text"
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={itemPlaceholder}
              className={inputBase}
            />
            <ItemActions
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              onRemove={() => remove(i)}
              disableUp={i === 0}
              disableDown={i === values.length - 1}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        className="btn-ghost mt-3 text-xs"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function ItemActions({
  onUp,
  onDown,
  onRemove,
  disableUp,
  disableDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  return (
    <div className="flex flex-shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={disableUp}
        title="Move up"
        className="rounded-md border border-ink-line bg-paper px-2 py-1 text-xs text-ink-muted transition hover:bg-paper-raised disabled:cursor-not-allowed disabled:opacity-30"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={disableDown}
        title="Move down"
        className="rounded-md border border-ink-line bg-paper px-2 py-1 text-xs text-ink-muted transition hover:bg-paper-raised disabled:cursor-not-allowed disabled:opacity-30"
      >
        ↓
      </button>
      <button
        type="button"
        onClick={onRemove}
        title="Remove"
        className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 transition hover:bg-red-100"
      >
        ×
      </button>
    </div>
  );
}

export function ImageField({
  label,
  hint,
  value,
  onChange,
  placeholderHref,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholderHref?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(value);

  useEffect(() => setPreview(value), [value]);

  async function onFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Only image files");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Max 5 MB");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? `Upload failed (${res.status})`);
        return;
      }
      onChange(body.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className="mt-2 flex items-start gap-4">
        <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-ink-line bg-paper">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={label}
              className="h-full w-full object-cover object-top"
              onError={() => setPreview("")}
            />
          ) : (
            <div className="grid h-full w-full place-items-center font-mono text-[10px] uppercase tracking-wider text-ink-dim">
              no image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholderHref ?? "/uploads/..."}
            className={inputBase}
          />
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-full border border-ink-line bg-paper px-3 py-1.5 text-xs text-ink transition hover:bg-paper-raised">
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                  e.target.value = "";
                }}
              />
            </label>
            {error && (
              <span className="text-xs text-red-600">⚠ {error}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ObjectArrayField<T>({
  label,
  hint,
  values,
  onChange,
  blank,
  renderItem,
  itemTitle,
  addLabel = "Add item",
}: {
  label: string;
  hint?: string;
  values: T[];
  onChange: (v: T[]) => void;
  blank: () => T;
  renderItem: (
    item: T,
    update: (patch: Partial<T>) => void,
    index: number
  ) => React.ReactNode;
  itemTitle: (item: T, index: number) => string;
  addLabel?: string;
}) {
  function updateItem(i: number, patch: Partial<T>) {
    const next = values.slice();
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...values, blank()]);
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <ul className="mt-2 space-y-3">
        {values.map((item, i) => (
          <li
            key={i}
            className="rounded-xl border border-ink-line bg-paper p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-sm font-medium text-ink">
                  {itemTitle(item, i)}
                </span>
              </div>
              <ItemActions
                onUp={() => move(i, -1)}
                onDown={() => move(i, 1)}
                onRemove={() => remove(i)}
                disableUp={i === 0}
                disableDown={i === values.length - 1}
              />
            </div>
            <div className="space-y-3">
              {renderItem(item, (patch) => updateItem(i, patch), i)}
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={add} className="btn-ghost mt-3 text-xs">
        + {addLabel}
      </button>
    </div>
  );
}
