"use client";

import SaveBar from "../fields/SaveBar";
import {
  TextField,
  ToggleField,
  ObjectArrayField,
} from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { Header } from "@/lib/content/schema";

type NavLink = Header["links"][number];

export default function HeaderForm({ initial }: { initial: Header }) {
  const { value, update, dirty, status, save } = useSectionForm<Header>(
    "header",
    initial
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Brand mark"
          hint="e.g. NI"
          value={value.brandMark}
          onChange={(v) => update({ ...value, brandMark: v })}
        />
        <TextField
          label="Eyebrow"
          hint="Small caps above the brand name"
          value={value.eyebrow}
          onChange={(v) => update({ ...value, eyebrow: v })}
        />
        <TextField
          label="Brand name"
          value={value.brandName}
          onChange={(v) => update({ ...value, brandName: v })}
        />
        <TextField
          label="Brand link"
          hint="Where the brand mark links to"
          value={value.brandHref}
          onChange={(v) => update({ ...value, brandHref: v })}
        />
      </div>

      <ObjectArrayField<NavLink>
        label="Nav links"
        values={value.links}
        onChange={(links) => update({ ...value, links })}
        blank={() => ({ n: "", label: "", href: "" })}
        itemTitle={(l) =>
          l.label ? `${l.label} (${l.href || "—"})` : "(new link)"
        }
        addLabel="Add nav link"
        renderItem={(item, up) => (
          <div className="grid gap-3 sm:grid-cols-[80px_1fr_1fr]">
            <TextField
              label="Number"
              value={item.n}
              onChange={(n) => up({ n })}
            />
            <TextField
              label="Label"
              value={item.label}
              onChange={(label) => up({ label })}
            />
            <TextField
              label="Href"
              value={item.href}
              onChange={(href) => up({ href })}
            />
          </div>
        )}
      />

      <div className="rounded-xl border border-ink-line bg-paper p-4">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
          Call to action
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Label"
            value={value.cta.label}
            onChange={(label) =>
              update({ ...value, cta: { ...value.cta, label } })
            }
          />
          <TextField
            label="Href"
            value={value.cta.href}
            onChange={(href) =>
              update({ ...value, cta: { ...value.cta, href } })
            }
          />
        </div>
        <div className="mt-3">
          <ToggleField
            label="Show dot"
            value={value.cta.showDot}
            onChange={(showDot) =>
              update({ ...value, cta: { ...value.cta, showDot } })
            }
          />
        </div>
      </div>

      <SaveBar
        status={status}
        dirty={dirty}
        onSave={save}
        rawHref="/admin/header/raw"
      />
    </div>
  );
}
