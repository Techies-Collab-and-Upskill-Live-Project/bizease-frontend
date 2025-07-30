'use client';

import { useEffect, useState } from 'react';
import { getInventoryStats } from '@/lib/services/inventory';
import { toast } from 'sonner';

export interface InventoryStats {
  total_stock_value: number;
  total_products: number;
  low_stock_count: number;
}
export default function useInventoryStats() {
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInventoryStats();

      setStats(response.data);

      toast.success('Inventory stats loaded successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory stats');

      toast.error(err.message || 'Failed to load inventory stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}
