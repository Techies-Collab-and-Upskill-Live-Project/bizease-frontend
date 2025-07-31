import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const body = await req.json();

//   const backendRes = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}accounts/google-login/`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//       // credentials: include not needed since this is server-to-server
//     },
//   );

//   const data = await backendRes.json();
//   const cookies = backendRes.headers.getSetCookie();

//   const response = NextResponse.json(data, { status: backendRes.status });

//   // Forward HttpOnly cookies from backend to browser
//   if (cookies) {
//     cookies.forEach((cookie) => {
//       response.headers.append('Set-Cookie', cookie);
//     });
//   }

//   return response;
// }

export async function POST(request: NextRequest) {
  const body = await request.json();

  return axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}accounts/google-login/`, body)
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
      const message = error?.response?.data.detail || 'google Login failed';

      return NextResponse.json({ message }, { status });
    });
}
