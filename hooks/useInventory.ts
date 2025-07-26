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
      console.error('Fetch inventory failed:', err);
      setError(err?.message || 'Error fetching inventory');
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  // Add new inventory item
  const createItem = async (item: Omit<PostInventoryItem, 'id'>) => {
    try {
      console.log('Adding new item:', item);
      const newItem = await addInventoryItem(item);
      setInventory((prev) => [newItem, ...prev]);
      console.log('New item posted:', newItem);
      return newItem;
    } catch (err: any) {
      console.error('Add item failed:', err);
      throw new Error(err?.response?.data?.message || 'Error adding item');
    }
  };

  // Update existing inventory item
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
      throw new Error(err?.response?.data?.message || 'Error updating item');
    }
  };

  const deleteItem = async (id: string, token: string) => {
    try {
      await deleteInventoryItem(id, token);
      setInventory((prev) => prev.filter((item) => String(item.id) !== id));
    } catch (err: any) {
      console.error('Delete item failed:', err);
      throw new Error(err?.response?.data?.message || 'Error deleting item');
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
    setInventory, // for advanced cases
  };
}
