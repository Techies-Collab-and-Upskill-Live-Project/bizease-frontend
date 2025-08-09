import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { DashboardDataResponse } from '@/types';

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
      `${process.env.NEXT_PUBLIC_BASE_URL}orders/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<DashboardDataResponse>;
    const errorMessage =
      axiosError.response?.data?.detail || 'Failed to add inventory item';

    return NextResponse.json(
      { message: errorMessage },
      {
        status: axiosError.response?.status || 500,
      },
    );
  }
}
