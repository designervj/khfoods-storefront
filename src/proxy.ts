import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "zh"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".") || pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const firstSegment = segments[1];
  const hasLocale = LOCALES.includes(firstSegment as any);

  if (hasLocale) {
    if (firstSegment === DEFAULT_LOCALE) {
      const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, "") || "/";
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|admin).*)"],
};
