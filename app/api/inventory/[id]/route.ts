import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';
import { API_BASE_PATH } from '@/lib/config';

const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value || null;
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }

  const token = getAuthToken();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();

  try {
    const res = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}}inventory/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Item updated successfully:', res.data);

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.response?.data?.detail ||
          error?.response?.data ||
          'Failed to update item',
      },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log('Deleting item with ID:', params.id);

  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }

  const token = getAuthToken();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}}inventory/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Item deleted successfully');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.response?.data?.detail ||
          error?.response?.data ||
          'Failed to delete item',
      },
      { status: error?.response?.status || 500 },
    );
  }
}
