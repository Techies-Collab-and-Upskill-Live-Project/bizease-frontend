import { OrderPayload } from '@/types';
import { axiosInstance } from '../axios';
import { toast } from 'sonner';

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
      // params: { page, status, order },
    });

    return res.data.data;
  } catch (err: any) {
    console.error(
      '[getOrders] Error:',
      err?.response?.data?.message || err.message,
    );
    throw new Error(err?.response?.data?.message || 'Failed to fetch orders');
  }
};

export const createOrder = async (orderData: OrderPayload) => {
  try {
    const res = await axiosInstance.post('/order', orderData);
    return res.data.data;
  } catch (error) {
    const err = error as any;

    if (err.response) {
      console.error('[createOrder] API Error:', err.response.data);

      throw err.response.data;
    } else if (err.request) {
      console.error('[createOrder] No response received:', err.request);
    } else {
      console.error('[createOrder] Unexpected error:', err.message);
    }

    throw new Error('Failed to create order');
  }
};

export const getOrderStats = async () => {
  try {
    const response = await axiosInstance.get('order/stats/');

    if (!response.data || !response.data.data) {
      throw new Error('Invalid response structure from order stats API');
    }
    return response.data.data;
  } catch (error) {
    console.error('[getOrderStats] Failed to fetch order stats', error);
    throw error;
  }
};

export async function updateOrder(id: string, data: OrderPayload) {
  const response = await axiosInstance.put(`/order/${id}`, data);

  if (!response.data) {
    throw new Error('Failed to update order');
  }
  console.log('response from service call for update', response.data);
  return response.data;
}

export async function deleteOrder(id: string) {
  try {
    const response = await axiosInstance.delete(`/order/${id}`);

    toast.success('Order deleted successfully');
    return response;
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.detail || 'Failed to delete order';
    toast.error(backendMessage);
    console.error('Delete order error:', backendMessage);
    throw new Error(backendMessage);
  }
}
