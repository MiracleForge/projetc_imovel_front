import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET!;

const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const GUEST_ONLY_ROUTES = ["/auth"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: AUTH_SECRET });
  const isAuthenticated = Boolean(token);

  if (PROTECTED_ROUTES.some((path) => pathname.startsWith(path)) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/entrar", req.url));
  }

  if (GUEST_ONLY_ROUTES.some((path) => pathname.startsWith(path)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/auth/:path*",
    "/dashboard/:path*",
    "/profile/:path*"
  ],
};

