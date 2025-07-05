/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGridDisplay } from "./ProductGridDisplay";
import { ProductListWrapperProps } from "@/interface";

export const ProductListWrapper: React.FC<ProductListWrapperProps> = ({
  filterOptions,
  products,
  currentSearchParams,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [currentSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [products]);

  const handleFilterChangeStart = () => {
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <FilterSidebar
        filterOptions={filterOptions}
        currentSearchParams={currentSearchParams}
        onFilterChange={handleFilterChangeStart}
      />

      <ProductGridDisplay
        products={products}
        currentSortBy={currentSearchParams.sortBy || "popular"}
        isLoading={isLoading}
      />
    </div>
  );
};
