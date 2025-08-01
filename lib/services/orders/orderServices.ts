import { getSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axios';

export const fetchOrdersServices = async () => {
  const session = await getSession();

  const response = await axiosInstance.get('/order', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  console.log(response, 'from orderServices');

  return response.data;
};
