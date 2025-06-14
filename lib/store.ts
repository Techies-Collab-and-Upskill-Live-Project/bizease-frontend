import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  inventoryItems as defaultInventory,
  recentOrders as defaultOrders,
} from '@/constants';

import { Order, Product, ReportPeriod } from '@/types';

interface ReportStore {
  period: ReportPeriod;
  setPeriod: (period: ReportPeriod) => void;

  // Derived data
  totalRevenue: number;
  topProducts: { name: string; revenue: number }[];

  computeReport: () => void;
}

interface InventoryStore {
  inventory: Product[];
  setInventory: (items: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  removeProduct: (id: number) => void;
  editProduct: (id: number, data: Partial<Product>) => void;
  reduceStock: (id: number, quantity: number) => void;
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      inventory: defaultInventory,

      setInventory: (products) => set({ inventory: products }),

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
              ? { ...item, ...data, lastUpdated: new Date().toLocaleString() }
              : item,
          ),
        }),

      reduceStock: (id, quantity) =>
        set({
          inventory: get().inventory.map((item) =>
            item.id === id
              ? {
                  ...item,
                  stock: Math.max(0, item.stock - quantity),
                  lastUpdated: new Date().toLocaleString(),
                }
              : item,
          ),
        }),
    }),
    {
      name: 'inventory',
    },
  ),
);

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
      name: 'order-storage',
    },
  ),
);

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
      topProducts: [],

      previousRevenue: 0,
      percentageChange: 0,

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

        filteredOrders?.forEach((order) => {
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
      name: 'report-settings', // storage key
      partialize: (state) => ({ period: state.period }), // only persist period
    },
  ),
);

// When orders change, auto-run computeReport.

useOrderStore.subscribe(() => {
  useReportStore.getState().computeReport();
});
