import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export interface InventoryItem {
  owner: string;
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  last_updated: string;
}
export interface InventoryData {
  data: InventoryItem[];
  message: string;
}
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
      `${process.env.NEXT_PUBLIC_BASE_URL}inventory/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('Raw inventory response:', response.data);

    console.log(response.data);
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<InventoryData>;

    console.error('Error fetching user data:', axiosError.message);

    return NextResponse.json(
      {
        message:
          axiosError.response?.data?.message || 'Failed to fetch inventory',
      },
      {
        status: axiosError.response?.status,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Unauthorized: No access token in cookies' },
      { status: 401 },
    );
  }

  try {
    const data = await req.json();

    const {
      product_name,
      description,
      low_stock_threshold,
      date_added,
      category,
      stock_level,
      price,
    } = data;

    // ✅ Ensure all required fields are sent
    const validPayload = {
      product_name,
      description,
      category,
      stock_level,
      price,
      low_stock_threshold,
      date_added,
    };

    // console.log('✅ Sending to backend:', validPayload);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}inventory/`,
      validPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // console.log(' Success:', response.data);

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const errorMessage =
      axiosError.response?.data?.detail ||
      axiosError.response?.data?.message ||
      'Failed to add inventory item';

    return NextResponse.json(
      { message: errorMessage },
      {
        status: axiosError.response?.status || 500,
      },
    );
  }
}
