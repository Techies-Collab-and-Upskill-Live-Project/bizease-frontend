import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function refreshTokens(req: NextRequest, refreshToken: string) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const isProd = process.env.NEXT_PUBLIC_ENV === "production";

  try {
    const response = await axios.post(
      `${baseURL}token/refresh/`,
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access, refresh } = response.data;

    const nextResponse = NextResponse.next();

    nextResponse.cookies.set("access_token", access, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    nextResponse.cookies.set("access_token", refresh, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return nextResponse;
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    return NextResponse.redirect(new URL("/log-in", req.url));
  }
}
