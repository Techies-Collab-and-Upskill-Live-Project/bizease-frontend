'use client';

import { Skeleton } from '@/components/ui/skeleton';

const MetricCardSkeleton = () => (
  <div className="bg-surface-200 rounded-md p-2 w-full h-full shadow-sm space-y-2 animate-pulse">
    <Skeleton className="h-3 w-1/3" />
    <Skeleton className="h-5 w-2/3" />
    <Skeleton className="h-4 w-1/4 mt-4" />
  </div>
);

const ReportSumsSkeleton = () => {
  return (
    <section className="w-full mx-auto px-4 lg:px-8 mt-4">
      <div className="flex justify-between max-lg:justify-end mb-4">
        <Skeleton className="h-6 w-1/3 hidden lg:block" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-fr">
        {Array.from({ length: 7 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default ReportSumsSkeleton;
