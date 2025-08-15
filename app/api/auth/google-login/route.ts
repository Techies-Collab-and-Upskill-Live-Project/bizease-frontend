import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import axios, { AxiosError } from 'axios';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.name) {
    return NextResponse.redirect(new URL('/log-in', req.url));
  }

  try {
    const { email, name } = session.user;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/google-login/`,
      {
        email,
        name,
      },
    );

    const { access, refresh } = res.data.data;

    const response = NextResponse.redirect(new URL('/dashboard', req.url));

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
  } catch (err: unknown) {
    let errorMessage = 'Unknown error';

    if (err instanceof AxiosError) {
      errorMessage = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error('Google login error:', errorMessage);

    return NextResponse.redirect(
      new URL('/log-in?error=google-login-failed', req.url),
    );
  }
}
