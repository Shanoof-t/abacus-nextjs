import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("token");
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
  // return NextResponse.redirect(new URL("/maintenance", request.url));
}

export const config = {
  matcher: [
    "/",
    "/accounts",
    "/transactions",
    "/category",
    "/budget",
    "/settings",
    // "/sign-in",
    // "/sign-up",
  ],
};
