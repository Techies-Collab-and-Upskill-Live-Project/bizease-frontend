import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Unauthorized: No access token' },
      { status: 401 },
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}dashboard-data/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(
      {
        message:
          (axiosError.response?.data as { detail?: string; message?: string })
            ?.detail ||
          (axiosError.response?.data as { detail?: string; message?: string })
            ?.message ||
          'Failed to fetch orders',
      },
      { status: axiosError.response?.status || 500 },
    );
  }
}
