import { cookies } from 'next/headers';

export async function getAccessTokenFromCookies(req?: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    throw new Error('No access token found in cookies');
  }

  return token;
}
