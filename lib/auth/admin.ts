import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, userFromToken } from "./session";
export async function requireAdmin() {
  const user = await userFromToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!user) throw new Error("Administrator authentication required.");
  return user;
}
