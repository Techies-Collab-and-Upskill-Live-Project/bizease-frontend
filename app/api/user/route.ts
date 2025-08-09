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

    delete data.email;
    delete data.password;

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts/`,
      data,
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
