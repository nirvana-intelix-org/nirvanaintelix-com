import {
  pgTable,
  text,
  jsonb,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

export const sections = pgTable("sections", {
  name: text("name").primaryKey(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  blocks: jsonb("blocks").notNull().default([]),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SectionRow = typeof sections.$inferSelect;
export type PageRow = typeof pages.$inferSelect;
