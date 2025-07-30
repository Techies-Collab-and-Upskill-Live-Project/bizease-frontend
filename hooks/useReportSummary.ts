import { useEffect, useState } from 'react';
import { ReportSummaryResponse } from '@/types';
import { getReportSummary } from '@/lib/services/reportSummary';

export function useReportSummary() {
  const [summaryData, setSummaryData] = useState<ReportSummaryResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await getReportSummary();
        setSummaryData(summary);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return {
    summaryData,
    loading,
    error,
  };
}
