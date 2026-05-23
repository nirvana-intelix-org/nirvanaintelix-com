"use client";

import {
  TextField,
  ImageField,
  ToggleField,
  ObjectArrayField,
} from "@/components/admin/fields/primitives";
import type { SliderBlock } from "@/lib/content/blocks";

type SliderImage = SliderBlock["props"]["images"][number];

export default function SliderBlockEditor({
  block,
  onChange,
}: {
  block: SliderBlock;
  onChange: (b: SliderBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <ObjectArrayField<SliderImage>
        label="Slides"
        hint="Each slide is an image with alt text"
        values={block.props.images}
        onChange={(images) =>
          onChange({ ...block, props: { ...block.props, images } })
        }
        blank={() => ({ src: "", alt: "" })}
        itemTitle={(item, i) => item.alt || `Slide ${i + 1}`}
        addLabel="Add slide"
        renderItem={(item, up) => (
          <div className="space-y-3">
            <ImageField
              label="Image"
              value={item.src}
              onChange={(src) => up({ src })}
            />
            <TextField
              label="Alt text"
              value={item.alt}
              onChange={(alt) => up({ alt })}
            />
          </div>
        )}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <ToggleField
          label="Autoplay"
          value={block.props.autoplay}
          onChange={(autoplay) =>
            onChange({ ...block, props: { ...block.props, autoplay } })
          }
        />
        <TextField
          label="Interval (ms)"
          hint="Time between slides (1000-20000)"
          value={String(block.props.intervalMs)}
          onChange={(v) => {
            const n = Number(v);
            if (!Number.isFinite(n)) return;
            onChange({
              ...block,
              props: {
                ...block.props,
                intervalMs: Math.min(20000, Math.max(1000, Math.round(n))),
              },
            });
          }}
        />
      </div>
    </div>
  );
}
