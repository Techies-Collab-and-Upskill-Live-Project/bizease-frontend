import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/password-reset/`,
      body,
    );

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { detail: 'Something went wrong while sending reset email.' },
      { status: 500 },
    );
  }
}
