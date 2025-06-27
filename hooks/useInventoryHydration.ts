'use client';
import { useEffect } from 'react';
import { useInventoryStore } from '@/lib/store';

export const useInventoryHydration = () => {
  const fetchInventory = useInventoryStore(
    (state) => state.fetchInventoryFromAPI,
  );

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);
};
