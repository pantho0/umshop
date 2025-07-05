import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingProductListingPage: React.FC = () => {
  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Top Bar Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <Skeleton className="h-8 w-48 rounded-md mb-4 sm:mb-0" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
        </div>

        {/* Main Content Area: Sidebar and Product Grid Skeleton */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-4 space-y-6 flex-shrink-0">
            <Skeleton className="h-8 w-3/4 rounded-md mb-4" />
            <div className="space-y-4">
              {[...Array(4)].map(
                (
                  _,
                  i // Simulate 4 filter sections
                ) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>
                )
              )}
            </div>
          </aside>

          {/* Product Grid Skeleton */}
          <section className="flex-grow">
            {/* Sort by Select Skeleton */}
            <div className="flex justify-end mb-4">
              <Skeleton className="h-10 w-48 rounded-md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map(
                (
                  _,
                  i // Simulate 8 product cards
                ) => (
                  <div
                    key={i}
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
                )
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoadingProductListingPage;
