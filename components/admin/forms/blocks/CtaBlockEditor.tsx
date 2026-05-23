"use client";

import {
  TextField,
  TextAreaField,
} from "@/components/admin/fields/primitives";
import type { CtaBlock } from "@/lib/content/blocks";

export default function CtaBlockEditor({
  block,
  onChange,
}: {
  block: CtaBlock;
  onChange: (b: CtaBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <TextField
        label="Heading"
        value={block.props.heading}
        onChange={(heading) =>
          onChange({ ...block, props: { ...block.props, heading } })
        }
      />
      <TextAreaField
        label="Body"
        rows={3}
        value={block.props.body}
        onChange={(body) =>
          onChange({ ...block, props: { ...block.props, body } })
        }
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Button label"
          value={block.props.buttonLabel}
          onChange={(buttonLabel) =>
            onChange({ ...block, props: { ...block.props, buttonLabel } })
          }
        />
        <TextField
          label="Button href"
          value={block.props.buttonHref}
          onChange={(buttonHref) =>
            onChange({ ...block, props: { ...block.props, buttonHref } })
          }
        />
      </div>
    </div>
  );
}
