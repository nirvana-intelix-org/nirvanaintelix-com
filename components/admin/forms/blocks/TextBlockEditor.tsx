"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { TextAreaField } from "@/components/admin/fields/primitives";
import type { TextBlock } from "@/lib/content/blocks";

export default function TextBlockEditor({
  block,
  onChange,
}: {
  block: TextBlock;
  onChange: (b: TextBlock) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="font-mono text-[10px] uppercase tracking-wider text-ink-muted hover:text-copper"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>
      {showPreview ? (
        <div className="prose prose-ink min-h-[8rem] max-w-none rounded-lg border border-ink-line bg-paper p-4 text-ink-soft prose-headings:font-serif prose-headings:text-ink prose-a:text-copper">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {block.props.content || "_(empty)_"}
          </ReactMarkdown>
        </div>
      ) : (
        <TextAreaField
          label="Markdown content"
          hint="**bold** _italic_ [link](url) - lists"
          rows={8}
          value={block.props.content}
          onChange={(content) =>
            onChange({ ...block, props: { ...block.props, content } })
          }
        />
      )}
    </div>
  );
}
