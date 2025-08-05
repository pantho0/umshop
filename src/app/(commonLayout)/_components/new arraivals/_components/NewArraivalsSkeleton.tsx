import { Skeleton } from "@/components/ui/skeleton";

const NewArraivalsSkeleton = () => {
  return (
    <>
      {/* Featured Product Skeleton */}
      <div className="lg:col-span-1 bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col justify-end p-6 md:p-12 relative min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 text-white mt-auto">
          <Skeleton className="h-8 w-3/4 mb-2 bg-gray-700" />
          <Skeleton className="h-12 w-1/2 bg-red-500 rounded-full" />
        </div>
      </div>

      {/* Product Grid Skeletons */}
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row items-center p-4"
          >
            <Skeleton className="w-24 h-24 object-contain rounded-md mr-4 flex-shrink-0" />
            <div className="flex-grow">
              <Skeleton className="h-4 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewArraivalsSkeleton;
