import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseServerConfigured = Boolean(url && serviceRoleKey);

export function getSupabaseServerClient() {
  if (!isSupabaseServerConfigured) return null;
  return createClient(url!, serviceRoleKey!, {
    auth: { persistSession: false },
  });
}
