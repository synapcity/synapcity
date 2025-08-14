import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/app", "/settings", "/home"];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!isProtected) return NextResponse.next();

  const hasCookie = !!req.cookies.get("demo_auth");
  if (!hasCookie) {
    const url = new URL("/", req.url);
    url.searchParams.set("from", pathname + (search ?? ""));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/settings/:path*, /home/:path*"],
};
