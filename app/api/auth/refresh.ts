import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export default function handler(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token");

  if (!refreshToken) {
    const response = NextResponse.json({ status: 401 });
    return response;
  }

  axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}token/refresh`, {
      refresh_token: refreshToken,
    })
    .then((result) => {
      const { access, refresh } = result.data.data;

      const response = NextResponse.json({ status: 200 });

      response.cookies.set("access_token", access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
        sameSite: "strict",
      });

      response.cookies.set("refresh_token", refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "strict",
      });

      return response;
    })
    .catch((error) => {
      console.error("Error refreshing token:", error);
      const response = NextResponse.json({ status: 401 });
      return response;
    });
}
