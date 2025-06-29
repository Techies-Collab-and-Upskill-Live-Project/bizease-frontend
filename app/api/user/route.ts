import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    console.log("no token");
    return NextResponse.json(
      { message: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error: any) {
    console.error("Error fetching user data:", error.message);

    return NextResponse.json(
      {
        message: error.response?.data?.detail || "Failed to fetch user details",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
