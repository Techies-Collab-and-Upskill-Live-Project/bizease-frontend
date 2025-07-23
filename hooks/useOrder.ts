import { useEffect, useState } from 'react';
import { getOrders, createOrder } from '@/lib/services/order';

export interface OrderedProduct {
  name: string;
  order_id?: number;
  quantity: number;
  price: number;
  cummulative_price: number;
}

export interface Order {
  id?: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: string;
  order_date: string;
  delivery_date: string;
  total_price: number;
  ordered_products: OrderedProduct[];
}

export function useOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);

  const fetchOrders = async ({
    page = 1,
    status = '',
    order = '',
  }: {
    page?: number;
    status?: string;
    order?: string;
  } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getOrders({ page, status, order });
      setOrders(data.orders || []);
      setPageCount(data.page_count || 1);
    } catch (err: any) {
      console.error('[fetchOrders] Failed:', err.message);
      setError(err.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const createNewOrder = async (order: Omit<Order, 'id'>) => {
    try {
      const result = await createOrder(order);
      await fetchOrders(); // Optional: refresh
      return result;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create order');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    pageCount,
    fetchOrders,
    createNewOrder,
    setOrders,
  };
}
