import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin protection
  if (pathname.startsWith("/admin") && 
      pathname !== "/admin/login") {
    const token = request.cookies.get("sg_admin_session")?.value;
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  // Portal protection
  if (pathname.startsWith("/portal") && 
      pathname !== "/portal/login" &&
      pathname !== "/portal/setup") {
    const token = request.cookies.get("sg_portal_session")?.value;
    if (!token) {
      return NextResponse.redirect(
        new URL("/portal/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
