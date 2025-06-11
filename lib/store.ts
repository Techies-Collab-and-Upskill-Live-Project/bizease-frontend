import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { inventoryItems as defaultInventory } from '@/constants'; // make sure this is defined/imported

type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  lastUpdated: string;
  lowStockThreshold?: number;
  description?: string;
};

interface InventoryStore {
  inventory: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  removeProduct: (id: number) => void;
  setInventory: (items: Product[]) => void;
  updateInventory: (updatedItems: Product[]) => void;
  editProduct: (id: number, data: Partial<Product>) => void;
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      inventory: defaultInventory,

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

      setInventory: (items) => set({ inventory: items }),

      updateInventory: (updatedItems) => set({ inventory: updatedItems }),

      editProduct: (id, data) =>
        set({
          inventory: get().inventory.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...data,
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

type User = {
  id: string;
  name: string;
  email: string;
  businessPlan: string;
};

type UserState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
