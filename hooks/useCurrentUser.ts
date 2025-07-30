'use client';

import { getAuthenticatedUser } from '@/lib/services/user';
import { useEffect, useState } from 'react';

interface User {
  business_name: string;
  full_name: string;
  email: string;
  business_type: string;
  country: string;
  currency: string;
  state: string;
  rcv_mail_for_new_orders: boolean;
  rcv_mail_for_low_stocks: boolean;
  phone: string;
  business_phone: string;
  business_address: string;
  rcv_mail_notification: boolean;
  rcv_msg_notification: boolean;
  default_order_status: string;
  language: string;
  low_stock_threshold: number;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAuthenticatedUser();
      setUser(res.data.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // initial load
  }, []);

  return { user, loading, error, refetchUser: fetchUser };
}
