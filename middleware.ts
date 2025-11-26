import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const allowList = [
  "/thanksgiving-rumble",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets and the target landing page.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    allowList.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the Thanksgiving Rumble page.
  const url = request.nextUrl.clone();
  url.pathname = "/thanksgiving-rumble";
  return NextResponse.redirect(url);
}
