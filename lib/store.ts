'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { recentOrders as defaultOrders } from '@/constants';
import { InventoryStore, Order, ReportPeriod } from '@/types';
import { fetchInventoryClient } from '@/lib/api/client/inventory';

// -------------------- INVENTORY STORE --------------------

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      inventory: [],
      searchTerm: '',

      setSearchTerm: (term) => set({ searchTerm: term }),
      setInventory: (products) => set({ inventory: products }),

      fetchInventoryFromAPI: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.warn('No token found in localStorage');
            return;
          }
          const fetchInventory = fetchInventoryClient();

          const data = await fetchInventory();
          set({ inventory: data });
        } catch (error) {
          console.error('Failed to fetch inventory', error);
        }
      },

      addProduct: (product) =>
        set({ inventory: [...get().inventory, product] }),

      updateProduct: (updatedProduct) =>
        set({
          inventory: get().inventory.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item,
          ),
        }),

      removeProduct: (id) =>
        set({
          inventory: get().inventory.filter((item) => item.id !== id),
        }),

      editProduct: (id, data) =>
        set({
          inventory: get().inventory.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...data,
                  last_updated: new Date().toISOString(),
                }
              : item,
          ),
        }),

      reduceStock: (id, quantity) =>
        set({
          inventory: get().inventory.map((item) =>
            String(item.id) === String(id)
              ? {
                  ...item,
                  stock: Math.max(0, item.stock - quantity),
                  last_updated: new Date().toISOString(),
                }
              : item,
          ),
        }),
    }),
    {
      name: 'inventory-store',
    },
  ),
);

// -------------------- ORDER STORE --------------------

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateOrder: (updatedOrder: Order) => void;
  deleteOrder: (id: string) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: defaultOrders,

      addOrder: (order) => set({ orders: [...get().orders, order] }),

      updateOrderStatus: (id, status) =>
        set({
          orders: get().orders.map((order) =>
            order.id === id ? { ...order, status } : order,
          ),
        }),

      updateOrder: (updatedOrder) =>
        set({
          orders: get().orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order,
          ),
        }),

      deleteOrder: (id) =>
        set({
          orders: get().orders.filter((order) => order.id !== id),
        }),
    }),
    {
      name: 'order-store',
    },
  ),
);

// -------------------- REPORT STORE --------------------

interface ReportStoreState {
  period: ReportPeriod;
  setPeriod: (period: ReportPeriod) => void;
  totalRevenue: number;
  previousRevenue: number;
  topProducts: { name: string; revenue: number }[];
  percentageChange: number;
  computeReport: () => void;
}

export const useReportStore = create<ReportStoreState>()(
  persist(
    (set, get) => ({
      period: '7d',
      totalRevenue: 0,
      previousRevenue: 0,
      percentageChange: 0,
      topProducts: [],

      setPeriod: (period) => {
        set({ period });
        get().computeReport();
      },

      computeReport: () => {
        const { orders } = useOrderStore.getState();
        const { period } = get();

        const now = new Date();
        const fromDate = new Date();

        switch (period) {
          case '7d':
            fromDate.setDate(now.getDate() - 7);
            break;
          case '30d':
            fromDate.setDate(now.getDate() - 30);
            break;
          case 'thisMonth':
            fromDate.setDate(1);
            break;
          case 'all':
            fromDate.setFullYear(2000);
            break;
        }

        const filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.date);
          return orderDate >= fromDate;
        });

        let totalRevenue = 0;
        const productMap: Record<string, { name: string; revenue: number }> =
          {};

        filteredOrders.forEach((order) => {
          totalRevenue += order.total;

          for (const product of order.products ?? []) {
            const { productId, productName, quantity, price } = product;

            const entry = (productMap[productId] ??= {
              name: productName,
              revenue: 0,
            });

            entry.revenue += quantity * price;
          }
        });

        const topProducts = Object.values(productMap)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 4);

        set({ totalRevenue, topProducts });
      },
    }),
    {
      name: 'report-store',
      partialize: (state) => ({ period: state.period }),
    },
  ),
);

// Recompute report when orders change
useOrderStore.subscribe(() => {
  useReportStore.getState().computeReport();
});
