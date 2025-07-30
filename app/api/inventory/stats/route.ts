import { NextRequest, NextResponse } from 'next/server';
import axios, { isAxiosError } from 'axios';

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

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error: unknown) {
    let status = 500;
    let detail = 'Something went wrong fetching inventory stats';

    if (isAxiosError(error)) {
      status = error.response?.status || 500;
      detail = error.response?.data?.detail || detail;

      console.error('Error fetching inventory stats (AxiosError):', {
        message: error.message,
        response: error.response?.data,
      });
    } else if (error instanceof Error) {
      console.error('Error fetching inventory stats:', {
        message: error.message,
      });
    } else {
      console.error('Unknown error while fetching inventory stats');
    }

    return NextResponse.json({ detail }, { status });
  }
}
