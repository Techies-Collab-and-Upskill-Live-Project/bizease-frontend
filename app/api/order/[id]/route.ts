export const runtime = 'nodejs';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';
import { DashboardDataResponse, DeleteOrderResponse } from '@/types';
import { AxiosError } from 'axios';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

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
      `${process.env.NEXT_PUBLIC_BASE_URL}orders/${id}`,
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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

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
    await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const axiosError = error as AxiosError<DeleteOrderResponse>;
    const backendMessage =
      axiosError?.response?.data?.detail || 'Failed to delete order';

    console.error('Delete order error:', backendMessage);
    return NextResponse.json(
      { error: backendMessage },
      { status: axiosError?.response?.status || 500 },
    );
  }
}
