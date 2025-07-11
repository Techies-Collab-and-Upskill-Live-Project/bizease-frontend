import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: 200 });

  response.cookies.set("access_token", "", { maxAge: 0, path: "/" });
  response.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });

  return response;
}
