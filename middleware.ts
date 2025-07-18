import { NextRequest, NextResponse } from "next/server";
import { refreshTokens } from "./lib/services/refresh";

// Protected routes
const PROTECTED_PATHS = [
  "/dashboard",
  "/profile",
  "/orders",
  "/settings",
  "/inventory",
  "/report-analytics",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip non-protected routes
  if (!PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // If no refresh token and access token, redirect to login
  if (!refreshToken && !accessToken) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  // Check if access token expired
  if (refreshToken && !accessToken) {
    // Access token expired, so refresh
    console.log("Middle reware: Access token expired, refreshing...");
    return await refreshTokens(req, refreshToken);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/settings/:path*",
    "/inventory/:path*",
    "/report-analytics/:path*",
  ],
};
