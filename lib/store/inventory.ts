'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InventoryStore } from '@/types';
import { axiosInstance } from '@/lib/axios';
import axios from 'axios';

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      inventory: [],
      stats: null,
      loading: false,
      error: null,
      searchTerm: '',

      setSearchTerm: (term) => set({ searchTerm: term }),
      setInventory: (products) => set({ inventory: products }),

      //  Fetch all inventory items
      fetchInventoryFromAPI: async () => {
        try {
          const res = await axiosInstance.get('/api/inventory');
          if (res.data?.data && Array.isArray(res.data.data)) {
            set({ inventory: res.data.data });
            console.log('[Zustand] Inventory updated:', res.data.data.length);
          } else {
            console.warn('[Zustand] Invalid inventory response format');
          }
        } catch (error) {
          console.error('[Zustand] Error fetching inventory:', error);
        }
      },
      //  Add new product to API
      addProductToAPI: async (newProduct) => {
        try {
          const response = await axiosInstance.post('/inventory', newProduct, {
            withCredentials: true, // Include if you're using cookies
          });

          if (response.status === 201 || response.status === 200) {
            const createdProduct = response.data;
            set((state) => ({
              inventory: [...state.inventory, createdProduct],
            }));
          } else {
            console.error('Failed to add product:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding product:', error);
          throw error; // Important: so that AddProductPage catch block is triggered
        }
      },

      //  Update product in API
      updateProductInAPI: async (id, data) => {
        try {
          const res = await axiosInstance.put(`/inventory/${id}`, data);
          const updated = res.data;
          set({
            inventory: get().inventory.map((item) =>
              String(item.id) === String(id) ? updated : item,
            ),
          });
        } catch (err: any) {
          set({ error: err?.message || 'Failed to update product' });
        }
      },

      //  Delete product from API
      deleteProductFromAPI: async (id) => {
        try {
          await axiosInstance.delete(`/inventory/${id}`);
          set({
            inventory: get().inventory.filter(
              (item) => String(item.id) !== String(id),
            ),
          });
        } catch (err: any) {
          set({ error: err?.message || 'Failed to delete product' });
        }
      },

      //  Fetch inventory stats
      fetchInventoryStats: async () => {
        try {
          const res = await axiosInstance.get('/inventory/stats');
          set({ stats: res.data });
        } catch (err: any) {
          set({ error: err?.message || 'Failed to fetch stats' });
        }
      },

      //  Local-only edits or stock reduction
      editProduct: (id, data) =>
        set({
          inventory: get().inventory.map((item) =>
            String(item.id) === String(id)
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
                  stock: Math.max(0, item.stock_level - quantity),
                  last_updated: new Date().toISOString(),
                }
              : item,
          ),
        }),
    }),
    { name: 'inventory-store' },
  ),
);
