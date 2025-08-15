import { axiosInstance } from '@/lib/axios';
import { ReportSummaryResponse } from '@/types';
import axios from 'axios';

export async function getReportSummary(): Promise<ReportSummaryResponse> {
  try {
    const response = await axiosInstance.get(
      '/report-analytics/report-summary',
    );

    return response.data.data;
  } catch (err: unknown) {
    let errorMessage = 'Failed to fetch report data';

    if (axios.isAxiosError(err)) {
      errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        err.message ||
        errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
}
