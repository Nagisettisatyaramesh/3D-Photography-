import "server-only";
import { Pool } from "pg";
const globalDb = globalThis as unknown as { studioPool?: Pool };
export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  return globalDb.studioPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 4, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000 });
}
