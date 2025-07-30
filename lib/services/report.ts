import axios from 'axios';
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
  } catch (err: unknown) {
    console.error('Error fetching report:', err);

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
};
