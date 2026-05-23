"use client";

import SaveBar from "../fields/SaveBar";
import {
  TextField,
  TextAreaField,
  StringArrayField,
  ObjectArrayField,
} from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { Capabilities } from "@/lib/content/schema";

type Group = Capabilities["groups"][number];

export default function CapabilitiesForm({
  initial,
}: {
  initial: Capabilities;
}) {
  const { value, update, dirty, status, save } =
    useSectionForm<Capabilities>("capabilities", initial);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-[160px_1fr_1fr]">
        <TextField
          label="Section label"
          value={value.sectionLabel}
          onChange={(sectionLabel) => update({ ...value, sectionLabel })}
        />
        <TextField
          label="Heading"
          value={value.heading}
          onChange={(heading) => update({ ...value, heading })}
        />
        <TextField
          label="Italic copper word"
          value={value.headingEm}
          onChange={(headingEm) => update({ ...value, headingEm })}
        />
      </div>

      <TextAreaField
        label="Intro paragraph"
        rows={3}
        value={value.intro}
        onChange={(intro) => update({ ...value, intro })}
      />

      <ObjectArrayField<Group>
        label="Capability groups"
        hint="The 8-card grid"
        values={value.groups}
        onChange={(groups) => update({ ...value, groups })}
        blank={() => ({ n: "", title: "", items: [] })}
        itemTitle={(item) => item.title || "(new group)"}
        addLabel="Add group"
        renderItem={(item, up) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
              <TextField label="Letter" value={item.n} onChange={(n) => up({ n })} />
              <TextField label="Title" value={item.title} onChange={(title) => up({ title })} />
            </div>
            <StringArrayField
              label="Items"
              values={item.items}
              onChange={(items) => up({ items })}
              addLabel="Add item"
            />
          </div>
        )}
      />

      <SaveBar
        status={status}
        dirty={dirty}
        onSave={save}
        rawHref="/admin/capabilities/raw"
      />
    </div>
  );
}
