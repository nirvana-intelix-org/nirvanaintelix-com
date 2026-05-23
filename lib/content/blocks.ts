import { z } from "zod";

export const BLOCK_TYPES = [
  "text",
  "heading",
  "image",
  "slider",
  "html",
  "cta",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const textBlockSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  props: z.object({
    content: z.string(),
  }),
});

export const headingBlockSchema = z.object({
  id: z.string(),
  type: z.literal("heading"),
  props: z.object({
    text: z.string(),
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    em: z.string().optional(),
  }),
});

export const imageBlockSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  props: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
});

export const sliderBlockSchema = z.object({
  id: z.string(),
  type: z.literal("slider"),
  props: z.object({
    images: z.array(
      z.object({ src: z.string(), alt: z.string() })
    ),
    autoplay: z.boolean(),
    intervalMs: z.number().int().min(1000).max(20000),
  }),
});

export const htmlBlockSchema = z.object({
  id: z.string(),
  type: z.literal("html"),
  props: z.object({
    html: z.string(),
  }),
});

export const ctaBlockSchema = z.object({
  id: z.string(),
  type: z.literal("cta"),
  props: z.object({
    heading: z.string(),
    body: z.string(),
    buttonLabel: z.string(),
    buttonHref: z.string(),
  }),
});

export const blockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  headingBlockSchema,
  imageBlockSchema,
  sliderBlockSchema,
  htmlBlockSchema,
  ctaBlockSchema,
]);

export const blocksArraySchema = z.array(blockSchema);

export type TextBlock = z.infer<typeof textBlockSchema>;
export type HeadingBlock = z.infer<typeof headingBlockSchema>;
export type ImageBlock = z.infer<typeof imageBlockSchema>;
export type SliderBlock = z.infer<typeof sliderBlockSchema>;
export type HtmlBlock = z.infer<typeof htmlBlockSchema>;
export type CtaBlock = z.infer<typeof ctaBlockSchema>;
export type Block = z.infer<typeof blockSchema>;

export const BLOCK_LABELS: Record<BlockType, string> = {
  text: "Text",
  heading: "Heading",
  image: "Image",
  slider: "Slider",
  html: "Raw HTML",
  cta: "Call to action",
};

export const BLOCK_HINTS: Record<BlockType, string> = {
  text: "Markdown supported — **bold**, _italic_, lists, links",
  heading: "H1 / H2 / H3 — optional italic copper word",
  image: "Single image with optional caption",
  slider: "Multi-image carousel with autoplay",
  html: "Arbitrary HTML — sanitized server-side at render",
  cta: "Headline + body + button",
};

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `b_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function newBlock(type: BlockType): Block {
  const id = uid();
  switch (type) {
    case "text":
      return { id, type: "text", props: { content: "" } };
    case "heading":
      return { id, type: "heading", props: { text: "", level: 2 } };
    case "image":
      return { id, type: "image", props: { src: "", alt: "" } };
    case "slider":
      return {
        id,
        type: "slider",
        props: { images: [], autoplay: true, intervalMs: 5000 },
      };
    case "html":
      return { id, type: "html", props: { html: "" } };
    case "cta":
      return {
        id,
        type: "cta",
        props: { heading: "", body: "", buttonLabel: "", buttonHref: "" },
      };
  }
}

export const pageSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9](?:[a-z0-9-/]*[a-z0-9])?$/,
      "Slug: lowercase letters, numbers, hyphens, slashes; no leading/trailing punctuation"
    ),
  title: z.string().min(1),
  description: z.string(),
  blocks: blocksArraySchema,
  published: z.boolean(),
});

export type PageInput = z.infer<typeof pageSchema>;

// Slugs that would collide with built-in routes or static assets.
export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "uploads",
  "_next",
  "screenshots",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "og.png",
  "apple-touch-icon.png",
  "favicon.svg",
]);

export function isReservedSlug(slug: string): boolean {
  const head = slug.split("/")[0];
  return RESERVED_SLUGS.has(head);
}
