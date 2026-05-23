/**
 * Run once after `drizzle-kit push` (or any time you want to re-seed missing
 * sections from the JSON files in /content/). Existing rows are NOT touched.
 *
 *   DATABASE_URL=postgres://... npx tsx script/seed.ts
 */
import { seedIfEmpty } from "../lib/content/reader";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }
  const { seeded } = await seedIfEmpty();
  if (seeded.length === 0) {
    console.log("Nothing to seed — all sections already present.");
  } else {
    console.log(`Seeded ${seeded.length} section(s):`, seeded.join(", "));
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
