// stores/orderStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../axios';
import { Order, OrderProduct } from '@/types';

interface OrderStore {
  orders: Order[];
  loading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  getOrderById: (id: string) => Promise<Order | null>;
  createOrder: (data: Partial<Order>) => Promise<Order | null>;
  updateOrder: (id: string, data: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  addOrderedProduct: (
    orderId: string,
    data: Partial<OrderProduct>,
  ) => Promise<void>;
  updateOrderedProduct: (
    orderId: string,
    productId: string,
    data: Partial<OrderProduct>,
  ) => Promise<void>;
  deleteOrderedProduct: (orderId: string, productId: string) => Promise<void>;

  getOrderStats: () => Promise<any>;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,

      fetchOrders: async () => {
        try {
          set({ loading: true });
          const res = await axiosInstance.get('/orders/');
          set({ orders: res.data });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      getOrderById: async (id) => {
        try {
          const res = await axiosInstance.get(`/orders/${id}`);
          return res.data;
        } catch {
          return null;
        }
      },

      createOrder: async (data) => {
        try {
          const res = await axiosInstance.post('/orders/', data);
          set({ orders: [...get().orders, res.data] });
          return res.data;
        } catch {
          return null;
        }
      },

      updateOrder: async (id, data) => {
        try {
          await axiosInstance.put(`/orders/${id}`, data);
          const updatedOrders = get().orders.map((o) =>
            o.id === id ? { ...o, ...data } : o,
          );
          set({ orders: updatedOrders });
        } catch {}
      },

      deleteOrder: async (id) => {
        try {
          await axiosInstance.delete(`/orders/${id}`);
          const filtered = get().orders.filter((o) => o.id !== id);
          set({ orders: filtered });
        } catch {}
      },

      addOrderedProduct: async (orderId, data) => {
        await axiosInstance.post(`/orders/${orderId}/ordered-products`, data);
      },

      updateOrderedProduct: async (orderId, productId, data) => {
        await axiosInstance.put(
          `/orders/${orderId}/ordered-products/${productId}`,
          data,
        );
      },

      deleteOrderedProduct: async (orderId, productId) => {
        await axiosInstance.delete(
          `/orders/${orderId}/ordered-products/${productId}`,
        );
      },

      getOrderStats: async () => {
        const res = await axiosInstance.get('/orders/stats');
        return res.data;
      },
    }),
    {
      name: 'order-store',
    },
  ),
);
