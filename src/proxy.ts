import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "zh"];
const DEFAULT_LOCALE = "en";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function normalizeLocalProxyUrl(url: URL) {
  if (!LOCAL_HOSTS.has(url.hostname)) {
    return url;
  }

  url.protocol = "http:";
  url.hostname = "127.0.0.1";
  return url;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".") || pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const firstSegment = segments[1];
  const hasLocale = LOCALES.includes(firstSegment as any);

  if (hasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(normalizeLocalProxyUrl(url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|admin).*)"],
};
