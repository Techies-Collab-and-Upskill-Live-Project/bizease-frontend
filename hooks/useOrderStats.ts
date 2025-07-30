import { useEffect, useState } from 'react';
import { getOrderStats } from '@/lib/services/order';

interface OrderStats {
  pending_orders: number;
  total_revenue: number;
  total_orders: number;
}

export const useOrderStats = () => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getOrderStats();
        setStats(response.data);
      } catch (err: unknown | any) {
        setError(err.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
