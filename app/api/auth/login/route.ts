import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('Login request body:', body);

  return axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}accounts/login/`, body)
    .then((result) => {
      const { refresh, access } = result.data.data;

      // setting cookies
      const response = NextResponse.json({
        status: 200,
      });

      const isProd = process.env.NODE_ENV === 'production';

      response.cookies.set('access_token', access, {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 15,
        path: '/',
        sameSite: 'lax',
      });

      response.cookies.set('refresh_token', refresh, {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax',
      });

      return response;
    })
    .catch((error) => {
      console.error('Error during login:', error.response?.data.detail);

      const status = error?.response?.status || 500;
      const message = error?.response?.data.detail || 'Login failed';

      return NextResponse.json({ message }, { status });
    });
}
