import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __drizzle: NodePgDatabase<typeof schema> | undefined;
}

function getPool(): Pool {
  if (!global.__pgPool) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Provide a Postgres connection string via env."
      );
    }
    global.__pgPool = new Pool({
      connectionString: url,
      max: 5,
      idleTimeoutMillis: 30_000,
    });
  }
  return global.__pgPool;
}

export function getDb(): NodePgDatabase<typeof schema> {
  if (!global.__drizzle) {
    global.__drizzle = drizzle(getPool(), { schema });
  }
  return global.__drizzle;
}

export { schema };
