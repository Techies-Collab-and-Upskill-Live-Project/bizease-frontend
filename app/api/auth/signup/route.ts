import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}accounts/signup`, body)
    .then((result) => {
      const { refresh, access } = result.data.data;

      // setting cookies
      const response = NextResponse.json({ status: 200 });

      response.cookies.set("access_token", access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15,
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
      console.error("Error during signup:", error.response.data.detail);
      const status = error?.response?.status || 500;
      const message =
        error?.response?.data?.message || "User exists, please log in";

      return NextResponse.json({ message }, { status });
    });
}
