"use client";

import { TextField } from "@/components/admin/fields/primitives";
import type { HeadingBlock } from "@/lib/content/blocks";

export default function HeadingBlockEditor({
  block,
  onChange,
}: {
  block: HeadingBlock;
  onChange: (b: HeadingBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
        <TextField
          label="Heading text"
          value={block.props.text}
          onChange={(text) =>
            onChange({ ...block, props: { ...block.props, text } })
          }
        />
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
            Level
          </div>
          <select
            value={block.props.level}
            onChange={(e) =>
              onChange({
                ...block,
                props: {
                  ...block.props,
                  level: Number(e.target.value) as 1 | 2 | 3,
                },
              })
            }
            className="mt-2 block w-full rounded-lg border border-ink-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-copper focus:ring-2 focus:ring-copper/15"
          >
            <option value={1}>H1 (largest)</option>
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
        </div>
        <TextField
          label="Italic copper word"
          hint="Optional, appended"
          value={block.props.em ?? ""}
          onChange={(em) =>
            onChange({
              ...block,
              props: { ...block.props, em: em.trim() ? em : undefined },
            })
          }
        />
      </div>
    </div>
  );
}
