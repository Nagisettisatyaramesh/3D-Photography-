import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(url && serviceRoleKey);

/** Service-role client — bypasses RLS entirely. Only ever call this from
 * server-only code (API routes, Server Actions) that has already verified
 * the caller is an authenticated admin (the /admin/* middleware does this). */
export function getSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(url!, serviceRoleKey!, {
    auth: { persistSession: false },
  });
}
