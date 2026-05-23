"use client";

import SaveBar from "../fields/SaveBar";
import { TextField, ToggleField } from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { Footer } from "@/lib/content/schema";

export default function FooterForm({ initial }: { initial: Footer }) {
  const { value, update, dirty, status, save } = useSectionForm<Footer>(
    "footer",
    initial
  );

  return (
    <div className="space-y-6">
      <TextField
        label="Copyright template"
        hint="Use {year} for the current year"
        value={value.copyrightTemplate}
        onChange={(v) => update({ ...value, copyrightTemplate: v })}
      />
      <ToggleField
        label="Show copper dot"
        value={value.showDot}
        onChange={(v) => update({ ...value, showDot: v })}
      />
      <SaveBar
        status={status}
        dirty={dirty}
        onSave={save}
        rawHref="/admin/footer/raw"
      />
    </div>
  );
}
