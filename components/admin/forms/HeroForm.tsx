"use client";

import SaveBar from "../fields/SaveBar";
import {
  TextField,
  TextAreaField,
  StringArrayField,
  ObjectArrayField,
} from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { Hero } from "@/lib/content/schema";

type Stat = Hero["stats"][number];

export default function HeroForm({ initial }: { initial: Hero }) {
  const { value, update, dirty, status, save } = useSectionForm<Hero>(
    "hero",
    initial
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Pill (teal)"
          hint="e.g. Building in MENA — 2026"
          value={value.pillTeal}
          onChange={(v) => update({ ...value, pillTeal: v })}
        />
        <TextField
          label="Pill (corner)"
          value={value.pillCorner}
          onChange={(v) => update({ ...value, pillCorner: v })}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <TextField
          label="Headline (lead)"
          value={value.headlineLead}
          onChange={(v) => update({ ...value, headlineLead: v })}
        />
        <TextField
          label="Headline (italic copper)"
          value={value.headlineEm}
          onChange={(v) => update({ ...value, headlineEm: v })}
        />
        <TextField
          label="Headline (trailing punctuation)"
          value={value.headlineTrail}
          onChange={(v) => update({ ...value, headlineTrail: v })}
        />
      </div>

      <TextAreaField
        label="Body paragraph"
        rows={4}
        value={value.body}
        onChange={(v) => update({ ...value, body: v })}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Primary CTA label"
          value={value.ctaPrimary}
          onChange={(v) => update({ ...value, ctaPrimary: v })}
        />
        <TextField
          label="Primary CTA href"
          value={value.ctaPrimaryHref}
          onChange={(v) => update({ ...value, ctaPrimaryHref: v })}
        />
        <TextField
          label="Ghost CTA label"
          value={value.ctaGhost}
          onChange={(v) => update({ ...value, ctaGhost: v })}
        />
        <TextField
          label="Ghost CTA href"
          value={value.ctaGhostHref}
          onChange={(v) => update({ ...value, ctaGhostHref: v })}
        />
      </div>

      <ObjectArrayField<Stat>
        label="Stats row"
        hint="The 4 small stats below the hero CTAs"
        values={value.stats}
        onChange={(stats) => update({ ...value, stats })}
        blank={() => ({ k: "", v: "" })}
        itemTitle={(s) => s.k || "(new stat)"}
        addLabel="Add stat"
        renderItem={(item, up) => (
          <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
            <TextField label="Big number" value={item.k} onChange={(k) => up({ k })} />
            <TextField label="Caption" value={item.v} onChange={(v) => up({ v })} />
          </div>
        )}
      />

      <StringArrayField
        label="Marquee items"
        hint="Scrolling text band below the hero"
        values={value.marqueeItems}
        onChange={(marqueeItems) => update({ ...value, marqueeItems })}
        addLabel="Add marquee item"
      />

      <SaveBar
        status={status}
        dirty={dirty}
        onSave={save}
        rawHref="/admin/hero/raw"
      />
    </div>
  );
}
