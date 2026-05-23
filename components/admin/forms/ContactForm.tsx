"use client";

import SaveBar from "../fields/SaveBar";
import {
  TextField,
  TextAreaField,
  ObjectArrayField,
} from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { Contact } from "@/lib/content/schema";

type Vital = Contact["vitals"][number];

export default function ContactForm({ initial }: { initial: Contact }) {
  const { value, update, dirty, status, save } = useSectionForm<Contact>(
    "contact",
    initial
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-[200px_1fr_1fr]">
        <TextField
          label="Section label"
          value={value.sectionLabel}
          onChange={(sectionLabel) => update({ ...value, sectionLabel })}
        />
        <TextField
          label="Headline"
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
        label="Body"
        rows={4}
        value={value.body}
        onChange={(body) => update({ ...value, body })}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <TextField
          label="Email"
          type="email"
          value={value.email}
          onChange={(email) => update({ ...value, email })}
        />
        <TextField
          label="Website href"
          value={value.websiteHref}
          onChange={(websiteHref) => update({ ...value, websiteHref })}
        />
        <TextField
          label="Website label"
          value={value.websiteLabel}
          onChange={(websiteLabel) => update({ ...value, websiteLabel })}
        />
      </div>

      <ObjectArrayField<Vital>
        label="Vitals card"
        hint="The studio info rows shown on the right of the Contact section"
        values={value.vitals}
        onChange={(vitals) => update({ ...value, vitals })}
        blank={() => ({ k: "", v: "" })}
        itemTitle={(item) => item.k || "(new row)"}
        addLabel="Add row"
        renderItem={(item, up) => (
          <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
            <TextField label="Label" value={item.k} onChange={(k) => up({ k })} />
            <TextField label="Value" value={item.v} onChange={(v) => up({ v })} />
          </div>
        )}
      />

      <SaveBar status={status} dirty={dirty} onSave={save} rawHref="/admin/contact/raw" />
    </div>
  );
}
