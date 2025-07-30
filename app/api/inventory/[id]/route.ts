import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';
import { DashboardDataResponse } from '@/types';
import { AxiosError } from 'axios';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }
  const accessToken = await cookies();
  const token = accessToken.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();

  try {
    const res = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}inventory/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return NextResponse.json(res.data);
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Item ID is required.' },
      { status: 400 },
    );
  }
  const accessToken = await cookies();
  const token = accessToken.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}inventory/${id}`;

    await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json({ success: true });
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
