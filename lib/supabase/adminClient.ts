import "server-only";
import { PostgrestClient } from "@supabase/postgrest-js";
// Keep existing query call sites while using local PostgreSQL through PostgREST.
export const isSupabaseAdminConfigured = Boolean(process.env.DATABASE_API_URL && process.env.DATABASE_API_TOKEN);
export function getSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  return new PostgrestClient(process.env.DATABASE_API_URL!, {
    headers: { Authorization: `Bearer ${process.env.DATABASE_API_TOKEN}` },
    fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }),
  });
}
