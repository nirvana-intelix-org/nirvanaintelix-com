import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const sections = pgTable("sections", {
  name: text("name").primaryKey(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SectionRow = typeof sections.$inferSelect;
