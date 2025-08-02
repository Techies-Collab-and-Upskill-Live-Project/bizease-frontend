import { ReportSummaryResponse } from '@/types';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    console.log('no token');
    return NextResponse.json(
      { message: 'Unauthorized: No access token' },
      { status: 401 },
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}reports/summary`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<ReportSummaryResponse>;

    return NextResponse.json(
      {
        message: axiosError.response?.data || 'Failed to fetch report-summary',
      },
      {
        status: axiosError.response?.status,
      },
    );
  }
}
