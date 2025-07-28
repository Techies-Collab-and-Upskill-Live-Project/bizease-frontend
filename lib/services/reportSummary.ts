import { axiosInstance } from '@/lib/axios';
import { ReportSummaryResponse } from '@/types';

export async function getReportSummary(): Promise<ReportSummaryResponse> {
  try {
    const response = await axiosInstance.get(
      '/report-analytics/report-summary',
    );
    console.log('report-analytics services', response);
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Failed to fetch report summary:',
      error?.response?.data || error.message,
    );
    throw new Error(
      error?.response?.data?.error || 'Unable to get report summary',
    );
  }
}
