'use client';

import { Skeleton } from '@/components/ui/skeleton';

const InventorySkeleton = () => {
  return (
    <section className="w-full h-full bg-gray-300">
      <div className="sticky top-0 z-50">
        <div className="h-16 px-6 py-2 flex items-center justify-between bg-surface-100 border-b">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full px-6 py-4">
        <Skeleton className="h-6 w-40 rounded" />

        {/* TotalInventory skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>

        {/* Search + Filter controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Skeleton className="h-10 w-full md:w-1/2 rounded-md" />
          <Skeleton className="h-10 w-full md:w-1/4 rounded-md" />
        </div>

        {/* Inventory list table/cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center pt-4">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default InventorySkeleton;
