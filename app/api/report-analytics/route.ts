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

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  console.log('Access Token:', accessToken);

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

    // Validation: either period OR both start_date & end_date
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

    const params: any = {};
    if (period) params.period = period;
    if (start_date && end_date) {
      params.start_date = start_date;
      params.end_date = end_date;
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

    console.log('Report Analytics Data:', response.data);

    return NextResponse.json({ status: 200, data: response.data.data });
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.detail ||
      axiosError.response?.data?.message ||
      'Failed to fetch report analytics';

    console.error('Error fetching report analytics:', message);

    return NextResponse.json(
      { message },
      { status: axiosError.response?.status || 500 },
    );
  }
}
