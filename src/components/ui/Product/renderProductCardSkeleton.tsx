import { Skeleton } from "../skeleton";

const renderProductCardSkeleton = (key: number) => (
  <div
    key={key}
    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-80"
  >
    <Skeleton className="relative w-full h-36 rounded-t-lg" />
    <div className="p-4 flex flex-col flex-grow">
      <Skeleton className="h-4 w-24 rounded-md mb-2" />
      <Skeleton className="h-5 w-3/4 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/2 rounded-md mt-auto" />
    </div>
    <div className="p-4 border-t border-gray-100 flex justify-end">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

export default renderProductCardSkeleton;
