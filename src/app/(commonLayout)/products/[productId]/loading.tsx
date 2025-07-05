"use client"; // This can be a client component as it's purely UI
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Shadcn Skeleton
import { ChevronRight } from "lucide-react"; // For the "See all product details" arrow

const LoadingProductDetailsPage: React.FC = () => {
  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Tabs List Skeleton */}

        {/* Main Content Area Skeleton (mimicking General Info tab) */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Image Slider Skeleton */}
            <div className="lg:w-1/2 flex flex-col items-center">
              <Skeleton className="w-full max-w-lg h-96 rounded-lg mb-4" />
              <div className="flex mt-4 space-x-2 justify-center">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-16 h-16 rounded-md" />
                ))}
              </div>
            </div>
            {/* Right Column: Product Details Skeleton */}
            <div className="lg:w-1/2 space-y-6">
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />{" "}
              {/* For rating/model ID */}
              {/* Model/Size Variants Skeleton */}
              <Skeleton className="h-6 w-20 mb-2" /> {/* "Model" text */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-20 rounded-md" />
              </div>
              {/* Color Variants Skeleton */}
              <Skeleton className="h-6 w-24 mb-2" /> {/* "Color" text */}
              <div className="flex space-x-2 mb-6">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              {/* Price and Add to Cart Skeleton */}
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center justify-between mb-6">
                <Skeleton className="h-10 w-32" /> {/* Price */}
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-24 rounded-md" />{" "}
                  {/* Quantity selector */}
                  <Skeleton className="h-10 w-32 rounded-md" />{" "}
                  {/* Add to cart button */}
                  <Skeleton className="h-10 w-10 rounded-md" />{" "}
                  {/* Heart icon */}
                </div>
              </div>
              {/* Additional Info Badges Skeleton */}
              <div className="flex flex-wrap gap-4 text-sm mb-6">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-44" />
              </div>
              <Skeleton className="h-0.5 w-full my-6" /> {/* Separator */}
              {/* Shipping Options Skeleton */}
              <Skeleton className="h-8 w-48 mb-4" />{" "}
              {/* "Shipping options" title */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-0.5 w-full my-6" /> {/* Separator */}
              {/* Collapsible Sections Skeleton */}
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-0.5 w-full my-6" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>

          {/* Product Details in general info tab (bottom section) Skeleton */}
          <div className="py-5 px-10 md:px-5 w-full md:max-w-2/4 mx-auto">
            {" "}
            {/* Added mx-auto for centering */}
            <div className="py-5">
              <Skeleton className="h-8 w-56 mb-6" />{" "}
              {/* "Product details" title */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-4">
                <div>
                  <Skeleton className="h-6 w-40 mb-3" />{" "}
                  {/* "General specs" title */}
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-6 w-48 mt-6 flex items-center">
                <ChevronRight className="ml-1 h-4 w-4" />{" "}
                {/* Mimic arrow in skeleton */}
              </Skeleton>
            </div>
            {/* Product review in general tab (bottom section) Skeleton */}
            <div className="py-5">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-32" /> {/* "Reviews" title */}
                <Skeleton className="h-10 w-32 rounded-md" />{" "}
                {/* "Leave a review" button */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Skeleton className="col-span-1 h-32 rounded-lg" />{" "}
                {/* Overall Rating Summary */}
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <Skeleton className="h-0.5 w-full my-6" /> {/* Separator */}
              <div className="space-y-8">
                {[...Array(2)].map(
                  (
                    _,
                    i // Simulate 2 individual reviews
                  ) => (
                    <div key={i} className="pb-6 space-y-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  )
                )}
              </div>
              <Skeleton className="h-6 w-48 mt-6 flex items-center">
                <ChevronRight className="ml-1 h-4 w-4" />{" "}
                {/* Mimic arrow in skeleton */}
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProductDetailsPage;
