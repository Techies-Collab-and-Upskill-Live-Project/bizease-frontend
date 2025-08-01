import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log('getting session at google-login', session);

  if (!session?.user?.email || !session.user.name) {
    return NextResponse.redirect(
      new URL('/log-in?error=missing-google-info', req.url),
    );
  }

  try {
    const { email, name } = session.user;
    console.log('getting payload at google-login', name, email);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/google-login/`,
      {
        email,
        name,
      },
    );

    console.log('getting response at google-login', res);

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
  } catch (err: any) {
    console.error('Google login error:', err.response?.data || err.message);
    return NextResponse.redirect(
      new URL('/log-in?error=google-login-failed', req.url),
    );
  }
}
