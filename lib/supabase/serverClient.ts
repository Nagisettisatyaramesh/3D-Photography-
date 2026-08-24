import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cookie-bound Supabase client for RSCs, route handlers and Server Actions
 * — reads/writes the signed-in user's own session, so RLS policies scoped
 * to `authenticated` apply. Use `getSupabaseAdminClient` instead when the
 * operation should bypass RLS (e.g. writing content as the admin). */
export async function getSupabaseServerClient() {
  if (!url || !anonKey) return null;
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render — middleware refreshes
          // the session cookie instead, so this is safe to ignore.
        }
      },
    },
  });
}
