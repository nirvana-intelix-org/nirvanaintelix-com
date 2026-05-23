"use client";

import SaveBar from "../fields/SaveBar";
import {
  TextField,
  TextAreaField,
  StringArrayField,
  ObjectArrayField,
  ToggleField,
  ImageField,
} from "../fields/primitives";
import { useSectionForm } from "../useSection";
import type { Projects, Project } from "@/lib/content/schema";

const SPAN_OPTIONS = [
  { value: "md:col-span-5", label: "5 / 12" },
  { value: "md:col-span-6", label: "6 / 12" },
  { value: "md:col-span-7", label: "7 / 12" },
  { value: "md:col-span-12", label: "12 / 12 (full)" },
];

const SWATCH_PRESETS = [
  { value: "from-[#15161a] to-[#2a2c33]", label: "Ink (Webziq)" },
  { value: "from-[#1b6359] to-[#0f3d36]", label: "Teal" },
  { value: "from-[#bd5a1a] to-[#7e3a0e]", label: "Copper" },
  { value: "from-[#2d5e84] to-[#1a3b56]", label: "Ocean" },
  { value: "from-[#2a4d3a] to-[#162b21]", label: "Forest" },
  { value: "from-[#6a3486] to-[#3d1d53]", label: "Plum" },
  { value: "from-[#7a1f3b] to-[#4a1024]", label: "Wine" },
  { value: "from-[#1f4f7a] to-[#102c45]", label: "Navy" },
];

export default function ProjectsForm({ initial }: { initial: Projects }) {
  const { value, update, dirty, status, save } = useSectionForm<Projects>(
    "projects",
    initial
  );

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
        rows={2}
        value={value.intro}
        onChange={(intro) => update({ ...value, intro })}
      />

      <ObjectArrayField<Project>
        label="Products"
        hint="Reorder with the ↑↓ buttons; the first item drives the bento layout"
        values={value.items}
        onChange={(items) => update({ ...value, items })}
        blank={() => ({
          n: "",
          title: "",
          tag: "",
          url: "",
          category: "",
          summary: "",
          stack: [],
          span: "md:col-span-6",
          swatch: "from-[#15161a] to-[#2a2c33]",
          screenshot: "",
        })}
        itemTitle={(item) => item.title || "(new product)"}
        addLabel="Add product"
        renderItem={(item, up) => (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[80px_1fr_1fr]">
              <TextField label="Number" value={item.n} onChange={(n) => up({ n })} />
              <TextField label="Title" value={item.title} onChange={(title) => up({ title })} />
              <TextField
                label="Arabic name"
                hint="Optional, shown next to title"
                value={item.arabic ?? ""}
                onChange={(arabic) =>
                  up({ arabic: arabic.trim() ? arabic : undefined } as Partial<Project>)
                }
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <TextField label="Tag" value={item.tag} onChange={(tag) => up({ tag })} />
              <TextField
                label="Category caption"
                value={item.category}
                onChange={(category) => up({ category })}
              />
              <TextField
                label="Live URL"
                type="url"
                value={item.url}
                onChange={(url) => up({ url })}
              />
            </div>

            <TextAreaField
              label="Summary"
              rows={3}
              value={item.summary}
              onChange={(summary) => up({ summary })}
            />

            <StringArrayField
              label="Tech stack"
              values={item.stack}
              onChange={(stack) => up({ stack })}
              addLabel="Add tech"
            />

            <ImageField
              label="Screenshot"
              hint="Upload an image (max 5 MB) or paste a URL"
              value={item.screenshot}
              onChange={(screenshot) => up({ screenshot })}
            />

            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                  Column span
                </div>
                <select
                  value={item.span}
                  onChange={(e) => up({ span: e.target.value })}
                  className="mt-2 block w-full rounded-lg border border-ink-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-copper focus:ring-2 focus:ring-copper/15"
                >
                  {SPAN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                  Card gradient
                </div>
                <select
                  value={item.swatch}
                  onChange={(e) => up({ swatch: e.target.value })}
                  className="mt-2 block w-full rounded-lg border border-ink-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-copper focus:ring-2 focus:ring-copper/15"
                >
                  {SWATCH_PRESETS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="self-end">
                <ToggleField
                  label="Flagship"
                  value={!!item.flagship}
                  onChange={(flagship) =>
                    up({ flagship: flagship || undefined } as Partial<Project>)
                  }
                />
              </div>
            </div>
          </div>
        )}
      />

      <TextAreaField
        label="Closing note"
        rows={2}
        value={value.closingNote}
        onChange={(closingNote) => update({ ...value, closingNote })}
      />

      <SaveBar
        status={status}
        dirty={dirty}
        onSave={save}
        rawHref="/admin/projects/raw"
      />
    </div>
  );
}
