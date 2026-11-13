import "server-only";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getPool } from "@/lib/db";
export const SESSION_COOKIE = "uc_admin_session";
export const SESSION_SECONDS = 8 * 60 * 60;
const digest = (token: string) => createHash("sha256").update(token).digest("hex");
export function verifyPassword(password: string, stored: string) {
  const [salt, encoded] = stored.split(":");
  if (!salt || !encoded) return false;
  const expected = Buffer.from(encoded, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export async function userFromToken(token?: string) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const { rows } = await getPool().query(`SELECT u.id, u.email FROM private.admin_sessions s JOIN private.admin_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now() AND u.enabled`, [digest(token)]);
  return (rows[0] as { id: string; email: string } | undefined) ?? null;
}
export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  await getPool().query("DELETE FROM private.admin_sessions WHERE expires_at<now()");
  await getPool().query("INSERT INTO private.admin_sessions(token_hash,user_id,expires_at) VALUES ($1,$2,now()+interval '8 hours')", [digest(token), userId]);
  return token;
}
export async function deleteSession(token?: string) {
  if (token) await getPool().query("DELETE FROM private.admin_sessions WHERE token_hash=$1", [digest(token)]);
}
