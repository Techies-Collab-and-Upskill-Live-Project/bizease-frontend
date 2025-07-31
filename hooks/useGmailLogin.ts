'use client';

import { useState } from 'react';
import { gmailLogin, GmailLoginPayload } from '@/lib/services/gmailLogin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// import { setAuthCookies } from '@/lib/utils/auth'; // Assume you have this helper for setting cookies

export function useGmailLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginWithGmail = async (payload: GmailLoginPayload) => {
    setLoading(true);
    try {
      const data = await gmailLogin(payload);

      if (data?.data?.access && data?.data?.refresh) {
        // setAuthCookies(data.data.access, data.data.refresh);
        toast.success('Login successful');
        router.push('/dashboard');
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGmail, loading };
}
