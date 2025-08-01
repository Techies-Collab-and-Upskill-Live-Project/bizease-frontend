'use client';
import { useEffect, useState } from 'react';
import { fetchOrdersServices } from '@/lib/services/orders/orderServices';
import { useRouter } from 'next/navigation';

export const useOrders = () => {
  const [orderService, setOrdersServices] = useState([]);
  const [loadingGmail, setLoadingGmail] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOrdersServices();
        setOrdersServices(data);
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoadingGmail(false);
      }
    };

    load();
  }, []);

  return { orderService, loadingGmail };
};
