import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/services/dashboard';

interface OrderedProduct {
  name: string;
  order_id: number;
  quantity: number;
  price: number;
  cummulative_price: number;
}

interface Order {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: string;
  order_date: string;
  delivery_date: string;
  total_price: number;
  ordered_products: OrderedProduct[];
}

interface LowStockItem {
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  last_updated: string;
  date_added: string;
}

interface DashboardStats {
  business_name: string;
  currency: string;
  language: string;
  top_Selling_product: string;
  revenue: number;
  pending_orders: Order[];
  low_stock_items: LowStockItem[];
}

export const useDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await getDashboardStats();
        setDashboardStats(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { dashboardStats, loading, error };
};
