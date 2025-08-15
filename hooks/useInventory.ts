import { useState, useEffect } from 'react';
import {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '@/lib/services/inventory';
import { InventoryItem, PostInventoryItem } from '@/types';

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInventory();
      const products = response?.data?.products ?? [];

      setInventory(products);
    } catch (err: any) {
      setError(err?.message || 'Error fetching inventory');
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  // Add new inventory item
  const createItem = async (item: Omit<PostInventoryItem, 'id'>) => {
    try {
      const newItem = await addInventoryItem(item);
      setInventory((prev) => [newItem, ...prev]);
      return newItem;
    } catch (err: any) {
      console.error('Add item failed:', err);
      throw new Error(err?.response?.data?.message || 'Error adding item');
    }
  };

  const updateItem = async (id: string, updates: Partial<InventoryItem>) => {
    try {
      const updatedItem = await updateInventoryItem(id, updates);
      setInventory((prev) =>
        prev.map((item) =>
          String(item.id) === id ? { ...item, ...updatedItem } : item,
        ),
      );
      return updatedItem;
    } catch (err: any) {
      console.error('Update item failed:', err);
      throw new Error(err?.message || 'Error updating item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteInventoryItem(id);

      setInventory((prev: InventoryItem[]) =>
        prev.filter((item) => String(item.id) !== id),
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Delete item failed:', err.message);
      throw new Error(err.message || 'Error deleting item');
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
    fetchInventory,
    createItem,
    updateItem,
    deleteItem,
    setInventory,
  };
}
