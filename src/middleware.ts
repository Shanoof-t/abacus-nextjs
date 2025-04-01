import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("token");
  console.log("user", user);
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/accounts",
    "/transactions",
    "/category",
    "/budget",
    "/settings",
  ],
};
