import { z } from "zod";

export const heroSchema = z.object({
  pillTeal: z.string(),
  pillCorner: z.string(),
  headlineLead: z.string(),
  headlineEm: z.string(),
  headlineTrail: z.string(),
  body: z.string(),
  ctaPrimary: z.string(),
  ctaPrimaryHref: z.string(),
  ctaGhost: z.string(),
  ctaGhostHref: z.string(),
  stats: z.array(
    z.object({
      k: z.string(),
      v: z.string(),
    })
  ),
  marqueeItems: z.array(z.string()),
});

export const aboutSchema = z.object({
  sectionLabel: z.string(),
  heading: z.string(),
  headingEm: z.string(),
  headingTrail: z.string(),
  quote: z.string(),
  paragraphs: z.array(z.string()),
  principles: z.array(
    z.object({
      k: z.string(),
      v: z.string(),
    })
  ),
});

export const capabilitiesSchema = z.object({
  sectionLabel: z.string(),
  heading: z.string(),
  headingEm: z.string(),
  intro: z.string(),
  groups: z.array(
    z.object({
      n: z.string(),
      title: z.string(),
      items: z.array(z.string()),
    })
  ),
});

export const projectSchema = z.object({
  n: z.string(),
  title: z.string(),
  arabic: z.string().optional(),
  tag: z.string(),
  url: z.string(),
  category: z.string(),
  summary: z.string(),
  stack: z.array(z.string()),
  span: z.string(),
  swatch: z.string(),
  screenshot: z.string(),
  flagship: z.boolean().optional(),
});

export const projectsSchema = z.object({
  sectionLabel: z.string(),
  heading: z.string(),
  headingEm: z.string(),
  intro: z.string(),
  closingNote: z.string(),
  items: z.array(projectSchema),
});

export const contactSchema = z.object({
  sectionLabel: z.string(),
  heading: z.string(),
  headingEm: z.string(),
  body: z.string(),
  email: z.string().email(),
  websiteHref: z.string(),
  websiteLabel: z.string(),
  vitals: z.array(
    z.object({
      k: z.string(),
      v: z.string(),
    })
  ),
});

export const SECTIONS = ["hero", "about", "capabilities", "projects", "contact"] as const;
export type SectionName = (typeof SECTIONS)[number];

export const sectionSchemas = {
  hero: heroSchema,
  about: aboutSchema,
  capabilities: capabilitiesSchema,
  projects: projectsSchema,
  contact: contactSchema,
} as const;

export type Hero = z.infer<typeof heroSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Capabilities = z.infer<typeof capabilitiesSchema>;
export type Projects = z.infer<typeof projectsSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Project = z.infer<typeof projectSchema>;
