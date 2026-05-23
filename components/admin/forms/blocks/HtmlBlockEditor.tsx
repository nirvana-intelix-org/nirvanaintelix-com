"use client";

import { TextAreaField } from "@/components/admin/fields/primitives";
import type { HtmlBlock } from "@/lib/content/blocks";

export default function HtmlBlockEditor({
  block,
  onChange,
}: {
  block: HtmlBlock;
  onChange: (b: HtmlBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <TextAreaField
        label="Raw HTML"
        hint="Scripts, iframes and on* handlers are stripped at render"
        rows={10}
        value={block.props.html}
        onChange={(html) =>
          onChange({ ...block, props: { ...block.props, html } })
        }
        placeholder="<div>...</div>"
      />
    </div>
  );
}
