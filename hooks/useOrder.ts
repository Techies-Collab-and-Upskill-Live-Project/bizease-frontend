import { useEffect, useState } from 'react';
import { getOrders, createOrder } from '@/lib/services/order';
import { Order, OrderUpdatePayload } from '@/types';
import { updateOrder, deleteOrder } from '@/lib/services/order';
import { toast } from 'sonner';

export interface OrderedProduct {
  name: string;
  quantity: number;
  price: number;
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
      const response = await getOrders({ page, status, order });

      setOrders(response.data.orders);

      setPageCount(response.page_count || 1);
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
      await fetchOrders();
      return result;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create order');
    }
  };

  const editOrder = async (id: string, updatedData: OrderUpdatePayload) => {
    try {
      const updated = await updateOrder(id, updatedData);
      console.log('hooking data', updated);

      setOrders((prev) =>
        prev.map((order) => (String(order.id) === id ? updated : order)),
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update order');
    }
  };

  const removeOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => String(order.id) !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete order');
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
    editOrder,
    removeOrder,
  };
}

// export function useOrderActions(token: string) {
//   const [loading, setLoading] = useState(false);

//   const handleUpdateOrder = async (id: string, data: OrderUpdatePayload) => {
//     setLoading(true);
//     try {
//       const updated = await updateOrder(id, data, token);
//       console.log('Order updated wiith ID', id, updated);
//       console.log('Order updated wiith ID', id, updated.data);
//       toast.success('Order updated successfully');
//       return updated;
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error || 'Update failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteOrder = async (id: string) => {
//     setLoading(true);
//     try {
//       const deleted = await deleteOrder(id, token);
//       console.log('Order deleted wiith ID', id, deleted);

//       toast.success('Order deleted successfully');
//       return deleted;
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error || 'Delete failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     updateOrder: handleUpdateOrder,
//     deleteOrder: handleDeleteOrder,
//   };
// }
