import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, userFromToken } from "@/lib/auth/session";
export async function proxy(request: NextRequest) {
  const user = await userFromToken(request.cookies.get(SESSION_COOKIE)?.value);
  const login = request.nextUrl.pathname === "/admin/login";
  if ((!login && !user) || (login && user)) {
    const url = request.nextUrl.clone(); url.pathname = user ? "/admin" : "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
