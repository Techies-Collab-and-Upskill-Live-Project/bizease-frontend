import { DeleteOrderResponse, OrderPayload } from '@/types';
import { axiosInstance } from '../axios';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

export const getOrders = async () => {
  try {
    const res = await axiosInstance.get('/order');

    return res.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<DeleteOrderResponse>;

    const backendMessage =
      axiosError?.response?.data?.detail || 'Failed to delete order';

    toast.error(backendMessage);
    console.error('Delete order error:', backendMessage);

    throw new Error(backendMessage);
  }
};

export const createOrder = async (orderData: OrderPayload) => {
  try {
    const res = await axiosInstance.post('/order', orderData);
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('[createOrder] API Error:', error.response.data);
        throw error.response.data; // or customize this
      } else if (error.request) {
        console.error('[createOrder] No response received:', error.request);
      } else {
        console.error('[createOrder] Axios error message:', error.message);
      }
    } else if (error instanceof Error) {
      console.error('[createOrder] Unexpected error:', error.message);
    } else {
      console.error('[createOrder] Unknown error:', error);
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
    const axiosError = error as AxiosError<DeleteOrderResponse>;

    const backendMessage =
      axiosError?.response?.data?.detail || 'Failed to delete order';

    toast.error(backendMessage);
    console.error('Delete order error:', backendMessage);

    throw new Error(backendMessage);
  }
};

export async function updateOrder(id: string, data: OrderPayload) {
  try {
    const response = await axiosInstance.put(`/order/${id}`, data);

    if (!response.data) {
      throw new Error('Failed to update order');
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<DeleteOrderResponse>;

    const backendMessage =
      axiosError?.response?.data?.detail || 'Failed to delete order';

    toast.error(backendMessage);
    console.error('Delete order error:', backendMessage);

    throw new Error(backendMessage);
  }
}

export async function deleteOrder(id: string) {
  try {
    const response = await axiosInstance.delete(`/order/${id}`);

    toast.success('Order deleted successfully');
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<DeleteOrderResponse>;

    const backendMessage =
      axiosError?.response?.data?.detail || 'Failed to delete order';

    toast.error(backendMessage);
    console.error('Delete order error:', backendMessage);

    throw new Error(backendMessage);
  }
}
