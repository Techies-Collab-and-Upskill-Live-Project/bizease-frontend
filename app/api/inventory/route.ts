import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  // Check if the access token exists
  if (!accessToken) {
    console.log("No token found");
    return NextResponse.json(
      { message: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/inventory`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Return the response data if successful
    console.log("Inventory data:", response.data);
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error: any) {
    console.error("Error fetching inventory data:", error.message);

    return NextResponse.json(
      {
        message:
          error.response?.data?.detail || "Failed to fetch inventory data",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
