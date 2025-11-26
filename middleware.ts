import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets and the target landing page.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[^/]+$/) || // any file with extension (images, fonts, etc.)
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/thanksgiving-rumble" ||
    pathname.startsWith("/thanksgiving-rumble/")
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the Thanksgiving Rumble page.
  const url = request.nextUrl.clone();
  url.pathname = "/thanksgiving-rumble";
  return NextResponse.redirect(url);
}
