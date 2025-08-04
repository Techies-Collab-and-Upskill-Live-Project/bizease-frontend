import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const accessToken = await cookies();
  const token = accessToken.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}inventory/`;

    const res = await axiosInstance.get(url, {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const detail =
      axiosError.response ||
      'Something went wrong while trying to process your request';
    return NextResponse.json({ detail }, { status });
  }
}
