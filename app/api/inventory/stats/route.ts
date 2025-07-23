import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}inventory/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log(response.data);

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error: any) {
    console.error('Error fetching inventory stats:', {
      message: error?.message,
      response: error?.response?.data,
    });

    const status = error?.response?.status || 500;
    const detail =
      error?.response?.data?.detail ||
      'Something went wrong fetching inventory stats';

    return NextResponse.json({ detail }, { status });
  }
}
