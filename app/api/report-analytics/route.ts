import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export interface ReportAnalyticsData {
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

type ApiErrorResponse = {
  detail?: string;
  message?: string;
};
type ReportAnalyticsParams =
  | { period: string; start_date?: undefined; end_date?: undefined }
  | { start_date: string; end_date: string; period?: undefined };

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Unauthorized: No access token' },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    if (period && (start_date || end_date)) {
      return NextResponse.json(
        {
          message:
            'Invalid query: Only period or a combination of start_date and end_date is allowed',
        },
        { status: 400 },
      );
    }

    if ((start_date && !end_date) || (!start_date && end_date)) {
      return NextResponse.json(
        { message: 'Both start_date and end_date must be provided' },
        { status: 400 },
      );
    }

    let params: ReportAnalyticsParams;

    if (period) {
      params = { period };
    } else if (start_date && end_date) {
      params = { start_date, end_date };
    } else {
      return NextResponse.json(
        {
          message:
            'Invalid query: Either period or both start_date and end_date must be provided',
        },
        { status: 400 },
      );
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}reports/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        params,
      },
    );

    return NextResponse.json({ status: 200, data: response.data.data });
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const message =
      axiosError.response?.data?.detail ||
      axiosError.response?.data?.message ||
      'Failed to fetch report analytics';

    return NextResponse.json(
      { message },
      { status: axiosError.response?.status || 500 },
    );
  }
}
