import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}accounts/signup/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Payload:', result.data);

    const { access, refresh } = result.data.data || result.data;

    const response = NextResponse.json({ status: 200 });

    response.cookies.set('access_token', access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'strict',
    });

    response.cookies.set('refresh_token', refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error: unknown) {
    let status = 500;
    let message = 'Signup failed';

    if (axios.isAxiosError(error)) {
      status = error.response?.status || 500;
      message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        'Signup failed';
    } else {
      console.error('Non-Axios error:', error);
    }

    console.error('Signup error:', message);
    return NextResponse.json({ error: message }, { status });
  }
}
