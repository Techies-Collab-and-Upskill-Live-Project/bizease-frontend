// hooks/useReport.ts
import { useEffect, useState } from 'react';
import { getReport, ReportQuery } from '@/lib/services/report';

export interface BusinessReport {
  period: string;
  top_selling_product: string;
  low_stock_items: number;
  pending_orders: number;
  total_products: number;
  total_stock_value: string;
  total_revenue: number;
  date_revenue_chart_data: {
    date: string;
    revenue: number;
  }[];
  product_sales_chart_data: {
    name: string;
    quantity_sold: number;
  }[];
}

export function useReport(params: ReportQuery) {
  const [report, setReport] = useState<BusinessReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const reportData = await getReport(params);
      console.log('hooks report ', reportData);
      setReport(reportData);
    } catch (err: any) {
      setError(err.message || 'Failed to load report');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.period || (params?.start_date && params?.end_date)) {
      fetchReport();
    }
  }, [params?.period, params?.start_date, params?.end_date]);

  return {
    report,
    loading,
    error,
    refetch: fetchReport,
    setReport,
  };
}
