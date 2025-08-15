import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

interface UserDataResponse {
  detail?: string;
}

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
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<UserDataResponse>;

    return NextResponse.json(
      {
        message:
          axiosError.response?.data?.detail || 'Failed to fetch user details',
      },
      {
        status: axiosError.response?.status,
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Unauthorized: No access token' },
      { status: 401 },
    );
  }

  try {
    const data = await req.json();

    //  Allowed keys the backend
    const allowedKeys = [
      'full_name',
      'currency',
      'country',
      'state',
      'city',
      'postal_code',
      'address',
      'company_name',
      'industry',

      'avatar',
      'phone',
    ];

    // Filter out unexpected fields
    const filteredData = Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => allowedKeys.includes(key))
        .map(([key, value]) => {
          // Ensure currency is always uppercase
          if (key === 'currency' && typeof value === 'string') {
            return [key, value.toUpperCase()];
          }
          return [key, value];
        }),
    );

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts/`,
      filteredData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<UserDataResponse>;

    return NextResponse.json(
      {
        message: axiosError.response?.data?.detail,
      },
      {
        status: axiosError.response?.status,
      },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { detail: 'Unauthorized: No access token' },
      { status: 401 },
    );
  }

  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    const axiosError = error as AxiosError<UserDataResponse>;
    const status = axiosError.response?.status || 500;
    return NextResponse.json(
      axiosError.response?.data || { detail: 'Failed to delete account' },
      { status },
    );
  }
}
