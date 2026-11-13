import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getPool } from "@/lib/db";
import { createSession, SESSION_COOKIE, SESSION_SECONDS, verifyPassword } from "@/lib/auth/session";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== (process.env.APP_ORIGIN || new URL(request.url).origin)) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (typeof body?.email !== "string" || typeof body?.password !== "string" || body.password.length > 256 || body.email.length > 254) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  }
  const key = createHash("sha256").update(request.headers.get("x-real-ip") || "unknown").digest("hex");
  const { rows: limits } = await getPool().query(
    `INSERT INTO private.login_limits(key, attempts, reset_at) VALUES($1,1,now()+interval '15 minutes')
     ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN private.login_limits.reset_at<=now() THEN 1 ELSE private.login_limits.attempts+1 END,
     reset_at=CASE WHEN private.login_limits.reset_at<=now() THEN now()+interval '15 minutes' ELSE private.login_limits.reset_at END RETURNING attempts`, [key],
  );
  if (limits[0].attempts > 10) return NextResponse.json({ error: "Try again later." }, { status: 429 });
  const { rows } = await getPool().query("SELECT id,password_hash FROM private.admin_users WHERE email=$1 AND enabled", [body.email.trim().toLowerCase()]);
  const valid = verifyPassword(body.password, rows[0]?.password_hash || "00000000000000000000000000000000:" + "00".repeat(64));
  if (!rows[0] || !valid) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, await createSession(rows[0].id), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_SECONDS,
  });
  return response;
}
