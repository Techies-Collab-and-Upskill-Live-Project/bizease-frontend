// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { axiosInstance } from '@/lib/axios';

// const getAuthToken = async () => {
//   const cookieStore = await cookies();
//   return cookieStore.get('access_token')?.value || null;
// };

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const id = params.id;
//   if (!id) {
//     return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
//   }

//   const token = getAuthToken();
//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const data = await req.json();

//   try {
//     const res = await axiosInstance.put(
//       `${process.env.NEXT_PUBLIC_BASE_URL}}inventory/${id}`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     console.log('Item updated successfully:', res.data);

//     return NextResponse.json(res.data);
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         error:
//           error?.response?.data?.detail ||
//           error?.response?.data ||
//           'Failed to update item',
//       },
//       { status: error?.response?.status || 500 },
//     );
//   }
// }

// export async function DELETE(
//   _req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   console.log('Deleting item with ID:', params.id);

//   const id = params.id;

//   if (!id) {
//     return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
//   }

//   const token = getAuthToken();
//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     await axiosInstance.delete(
//       `${process.env.NEXT_PUBLIC_BASE_URL}}inventory/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     console.log('Item deleted successfully');

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         error:
//           error?.response?.data?.detail ||
//           error?.response?.data ||
//           'Failed to delete item',
//       },
//       { status: error?.response?.status || 500 },
//     );
//   }
// }

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const id = params.id;
//   console.log('put function product id', id);
//   if (!id) {
//     return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
//   }

//   const tokenStore = await cookies();
//   const token = tokenStore.get('access_token')?.value;

//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const data = await req.json();
//   console.log('editing data', data);

//   try {
//     const res = await axiosInstance.put(
//       `${process.env.NEXT_PUBLIC_BASE_URL}inventory/${id}`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     console.log('Item updated successfully:', res.data);

//     return NextResponse.json(res.data);
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         error:
//           error?.response?.data?.detail ||
//           error?.response?.data ||
//           'Failed to update item',
//       },
//       { status: error?.response?.status || 500 },
//     );
//   }
// }

// app/api/inventory/[id]/route.ts

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } },
) {
  console.log('✅ API ROUTE HIT: PUT /api/inventory/[id]');

  const { params } = context;
  const id = params.id;

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
  } catch (error: any) {
    console.error('PUT route error:', error?.response?.data || error);
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
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Item ID is required.' },
      { status: 400 },
    );
  }

  const tokenStore = await cookies();
  const token = tokenStore.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/inventory/${id}`;

    await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Order with ID ${id} deleted successfully.`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Failed to delete order ${id}:`, error);

    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong while deleting the item.';

    return NextResponse.json({ error: message }, { status });
  }
}
