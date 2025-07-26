// // lib/services/report.ts
// //
// export interface ReportQuery {
//   period?: 'last-week' | 'last-month' | 'last-6-months' | 'last-year';
//   start_date?: string;
//   end_date?: string;
// }

// export interface ReportData {
//   period: string;
//   top_selling_product: string;
//   low_stock_items: number;
//   pending_orders: number;
//   total_products: number;
//   total_stock_value: string;
//   total_revenue: number;
//   date_revenue_chart_data: { date: string; revenue: number }[];
//   product_sales_chart_data: { name: string; quantity_sold: number }[];
// }

// export async function getReport(params: ReportQuery): Promise<ReportData> {
//   const query = qs.stringify(params);
//   const res = await fetch(`/reports/?${query}`, {
//     method: 'GET',
//     headers: { Accept: 'application/json' },
//     credentials: 'include', // if using cookies
//   });

//   if (!res.ok) {
//     const errorBody = await res.json();
//     throw new Error(errorBody?.detail || 'Failed to fetch report data');
//   }

//   const json = await res.json();
//   return json.data;
// }

// lib/services/report.ts
import { axiosInstance } from '../axios';

export interface ReportQuery {
  period?: 'last-week' | 'last-month' | 'last-6-months' | 'last-year';
  start_date?: string;
  end_date?: string;
}

export const getReport = async (params: ReportQuery) => {
  try {
    const res = await axiosInstance.get('/report-analytics/', { params });

    if (res.data?.error) {
      console.error('Error fetching report:', res.data.error);
      throw new Error(res.data.error);
    }

    return res.data.data;
  } catch (err: any) {
    console.error('Error fetching report:', err);
    throw new Error(
      err?.response?.data?.detail ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to fetch report data',
    );
  }
};
