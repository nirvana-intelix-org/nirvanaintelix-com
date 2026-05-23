"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  TextAreaField,
  ToggleField,
} from "@/components/admin/fields/primitives";

export default function NewPageForm() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim(),
          title: title.trim(),
          description: description.trim(),
          blocks: [],
          published,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? `Create failed (${res.status})`);
        return;
      }
      router.replace(`/admin/pages/${body.page.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <TextField
        label="Slug"
        hint="Lowercase letters, numbers, hyphens, slashes — e.g. about, blog/launch"
        value={slug}
        onChange={setSlug}
        placeholder="about"
      />
      <TextField
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="About Nirvana Intelix"
      />
      <TextAreaField
        label="Meta description"
        rows={2}
        value={description}
        onChange={setDescription}
        placeholder="Optional — used for SEO + link previews"
      />
      <ToggleField
        label="Publish immediately"
        hint="If off, page is a draft (404 publicly)"
        value={published}
        onChange={setPublished}
      />
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          ⚠ {error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending || !slug.trim() || !title.trim()}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? "Creating…" : "Create page"}
      </button>
    </form>
  );
}
