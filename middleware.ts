import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE } from "./contants/storage";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(COOKIE.REFRESH_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/profile", "/my-listings"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!refreshToken && !isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (refreshToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/my-listings/:path*"],
};
