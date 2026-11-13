import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");

const directory = path.join(process.cwd(), "database");
const migrations = (await fs.readdir(directory)).filter((name) => /^\d+_.+\.sql$/.test(name)).sort();

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  // Every migration is safe to re-run, so each deploy can run them all in order.
  for (const name of migrations) {
    await client.query(await fs.readFile(path.join(directory, name), "utf8"));
    console.log(`Applied ${name}`);
  }
  console.log("PostgreSQL schema is ready.");
} finally {
  await client.end();
}
