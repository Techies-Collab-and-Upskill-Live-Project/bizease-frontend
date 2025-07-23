import { axiosInstance } from '../axios';

export const getOrders = async ({
  page = 1,
  status = '',
  order = '',
}: {
  page?: number;
  status?: string;
  order?: string;
}) => {
  try {
    const res = await axiosInstance.get('/order', {
      params: {
        page,
        status,
        order,
      },
    });

    console.log('[getOrders] Success:', res.data.data);
    return res.data.data;
  } catch (err: any) {
    console.error(
      '[getOrders] Error:',
      err?.response?.data?.message || err.message,
    );
    throw new Error(err?.response?.data?.message || 'Failed to fetch orders');
  }
};

// POST Order
export const createOrder = async (orderData: any) => {
  try {
    const res = await axiosInstance.post('/order', orderData);
    console.log('[createOrder] Success:', res.data.data);
    return res.data.data;
  } catch (err: any) {
    console.error(
      '[createOrder] Error:',
      err?.response?.data?.message || err.message,
    );
    throw new Error(err?.response?.data?.message || 'Failed to create order');
  }
};
