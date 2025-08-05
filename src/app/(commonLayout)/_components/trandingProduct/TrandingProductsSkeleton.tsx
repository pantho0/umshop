

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

 const TrendingProductsSkeleton = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col relative group"
            >
              {/* Skeleton Image */}
              <Skeleton className="relative w-full h-24 md:h-48" />

              {/* Skeleton Info */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Skeleton Stars */}
                <Skeleton className="h-4 w-20 mb-2" />
                {/* Skeleton Title */}
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                {/* Skeleton Price */}
                <Skeleton className="h-4 w-16 mt-auto" />
              </div>
            </div>
          ))}
        </div>
    );
}

export default TrendingProductsSkeleton;
