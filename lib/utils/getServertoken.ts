import { cookies } from 'next/headers';

export const getServerToken = async () => {
  const cookieStore = await cookies(); // ✅ await here
  return cookieStore.get('access_token')?.value || null;
};
