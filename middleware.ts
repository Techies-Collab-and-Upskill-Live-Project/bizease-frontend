import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Protected routes
const PROTECTED_PATHS = [
  "/dashboard",
  "/profile",
  "/orders",
  "/settings",
  "/inventory",
  "/report-analytics",
];

// Decode JWT payload without verifying signature just to check exp
function decodeJWT(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString();
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip non-protected routes
  if (!PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // If no access token or refresh token, redirect to login
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  // Check if access token expired
  const decoded = decodeJWT(accessToken);
  const now = Math.floor(Date.now() / 1000);

  if (decoded && decoded.exp && decoded.exp > now) {
    return NextResponse.next();
  }

  // Access token expired, so refresh
  try {
    const refreshRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}token/refresh/`,
      { refresh: refreshToken },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { access, refresh } = refreshRes.data.data;

    const response = NextResponse.next();
    const isProd = process.env.NODE_ENV === "production";

    response.cookies.set("access_token", access, {
      httpOnly: true,
      secure: isProd,
      maxAge: 60 * 15,
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set("refresh_token", refresh, {
      httpOnly: true,
      secure: isProd,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return NextResponse.redirect(new URL("/log-in", req.url));
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
