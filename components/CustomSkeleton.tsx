import { Skeleton } from '@/components/ui/skeleton';

const CustomSkeleton = () => {
  return (
    <section className="w-full h-full bg-gray-300">
      <div className="flex flex-col gap-4 w-full px-6 py-4">
        <Skeleton className="h-6 w-40 rounded" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>

        <div className="flex justify-center pt-4">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default CustomSkeleton;
