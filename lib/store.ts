import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  inventoryItems as defaultInventory,
  recentOrders as defaultOrders,
} from '@/constants';

type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  lastUpdated: string;
  status: string;
  lowStockThreshold?: number;
  description?: string;
};

type Order = {
  id: string;
  name: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  total: number;
  lastUpdated: string;
  date: string;
};

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

      setInventory: (items) => set({ inventory: items }),

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
