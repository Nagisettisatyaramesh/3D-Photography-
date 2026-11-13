import "server-only";
import { cookies } from "next/headers";
import { deleteSession, SESSION_COOKIE, userFromToken } from "@/lib/auth/session";
export async function getSupabaseServerClient() {
  const store = await cookies();
  return { auth: {
    getUser: async () => ({ data: { user: await userFromToken(store.get(SESSION_COOKIE)?.value) } }),
    signOut: async () => { await deleteSession(store.get(SESSION_COOKIE)?.value); store.delete(SESSION_COOKIE); },
  } };
}
