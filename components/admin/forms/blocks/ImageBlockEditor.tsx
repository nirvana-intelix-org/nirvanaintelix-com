"use client";

import { TextField, ImageField } from "@/components/admin/fields/primitives";
import type { ImageBlock } from "@/lib/content/blocks";

export default function ImageBlockEditor({
  block,
  onChange,
}: {
  block: ImageBlock;
  onChange: (b: ImageBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <ImageField
        label="Image"
        value={block.props.src}
        onChange={(src) =>
          onChange({ ...block, props: { ...block.props, src } })
        }
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Alt text"
          hint="For accessibility + SEO"
          value={block.props.alt}
          onChange={(alt) =>
            onChange({ ...block, props: { ...block.props, alt } })
          }
        />
        <TextField
          label="Caption"
          hint="Optional, shown below the image"
          value={block.props.caption ?? ""}
          onChange={(caption) =>
            onChange({
              ...block,
              props: {
                ...block.props,
                caption: caption.trim() ? caption : undefined,
              },
            })
          }
        />
      </div>
    </div>
  );
}
