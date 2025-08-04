import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/password-reset-confirm/`,
      body,
    );

    console.log('reset password route payload', body);
    console.log('reset password route respose', res);
    console.log('reset password route respose', res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { detail: 'Something went wrong while resetting password.' },
      { status: 500 },
    );
  }
}
