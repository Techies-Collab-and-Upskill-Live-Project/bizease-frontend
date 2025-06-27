"use client";

import { useEffect, useState } from "react";

interface User {
    business_name: string,
    full_name: string,
    email: string,
    business_type: string,
    country: string,
    currency: string,
    state: string,
    rcv_mail_for_new_orders: boolean,
    rcv_mail_for_low_stocks: boolean,
    phone: string,
    business_phone: string,
    business_address: string,
    rcv_mail_notification: boolean,
    rcv_msg_notification: boolean,
    default_order_status: string,
    language: string,
    low_stock_threshold: number,
  
}

export default function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}accounts/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          setError(`Failed to fetch user: ${errText}`);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.data);
      } catch (err: any) {
        setError("Unexpected error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
