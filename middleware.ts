import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Host-based routing for brand.mypresence.pro → /brand.
 * Local dev: visit http://localhost:3000/brand directly.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  const isBrandHost =
    host.startsWith("brand.") ||
    host.startsWith("brand.localhost") ||
    host.startsWith("brand.local");

  if (!isBrandHost) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/brand")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/brand" : `/brand${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
