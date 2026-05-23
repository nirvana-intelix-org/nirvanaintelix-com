"use client";

import SaveBar from "../fields/SaveBar";
import {
  TextField,
  TextAreaField,
  StringArrayField,
  ObjectArrayField,
} from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { About } from "@/lib/content/schema";

type Principle = About["principles"][number];

export default function AboutForm({ initial }: { initial: About }) {
  const { value, update, dirty, status, save } = useSectionForm<About>(
    "about",
    initial
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-[160px_1fr_1fr_1fr]">
        <TextField
          label="Section label"
          value={value.sectionLabel}
          onChange={(sectionLabel) => update({ ...value, sectionLabel })}
        />
        <TextField
          label="Heading lead"
          value={value.heading}
          onChange={(heading) => update({ ...value, heading })}
        />
        <TextField
          label="Italic copper word"
          value={value.headingEm}
          onChange={(headingEm) => update({ ...value, headingEm })}
        />
        <TextField
          label="Heading trailing template"
          hint="Use {em} as placeholder, e.g. 'that {em}.'"
          value={value.headingTrail}
          onChange={(headingTrail) => update({ ...value, headingTrail })}
        />
      </div>

      <TextAreaField
        label="Pull quote"
        rows={3}
        value={value.quote}
        onChange={(quote) => update({ ...value, quote })}
      />

      <StringArrayField
        label="Paragraphs"
        values={value.paragraphs}
        onChange={(paragraphs) => update({ ...value, paragraphs })}
        addLabel="Add paragraph"
      />

      <ObjectArrayField<Principle>
        label="Principles (2x2 bento)"
        values={value.principles}
        onChange={(principles) => update({ ...value, principles })}
        blank={() => ({ k: "", v: "" })}
        itemTitle={(item) => item.k || "(new principle)"}
        addLabel="Add principle"
        renderItem={(item, up) => (
          <div className="space-y-3">
            <TextField label="Title" value={item.k} onChange={(k) => up({ k })} />
            <TextAreaField
              label="Description"
              rows={2}
              value={item.v}
              onChange={(v) => up({ v })}
            />
          </div>
        )}
      />

      <SaveBar status={status} dirty={dirty} onSave={save} rawHref="/admin/about/raw" />
    </div>
  );
}
