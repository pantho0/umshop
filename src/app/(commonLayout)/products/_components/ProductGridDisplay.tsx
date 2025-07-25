/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGridDisplayProps } from "@/interface";
import renderProductCardSkeleton from "@/components/ui/Product/renderProductCardSkeleton";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Simple deterministic hash function
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
export const ProductGridDisplay: React.FC<ProductGridDisplayProps> = ({
  products,
  currentSortBy,
  isLoading,
  meta,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ratings, setRatings] = useState<{ [key: string]: number }>(() => {
    // Initialize with deterministic ratings based on product ID
    return products.reduce((acc, product) => {
      // Create a deterministic rating between 3-5 based on product ID
      const hash = simpleHash(product._id);
      acc[product._id] = (hash % 3) + 3; // Will be 3, 4, or 5
      return acc;
    }, {} as { [key: string]: number });
  });

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getRating = (productId: string) => {
    // This ensures we get the same rating on both server and client
    const hash = simpleHash(productId);
    return (hash % 3) + 3; // Will be 3, 4, or 5
  };

  const renderStars = (productId: string) => {
    const rating = getRating(productId);

    // Create stars array with proper keys and consistent rendering
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      );
    }

    return (
      <div className="flex" aria-label={`${rating} out of 5 stars`}>
        {stars}
      </div>
    );
  };
  return (
    <section className="flex-grow">
      <h2 className="sr-only">Product Listings</h2>{" "}
      <div className="flex justify-end mb-4">
        <Select value={currentSortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] bg-white rounded-md border border-gray-300">
            <SelectValue placeholder="Sort by: Most popular" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {isLoading
          ? // Render skeletons when loading
            [...Array(8)].map((_, i) => renderProductCardSkeleton(i))
          : // Render actual products when not loading
            products.map((product, index) => {
              // Simulate badges (for demo purposes)
              const hasDiscount = index === 0;
              const isNew = index === 3;
              const productPrice = product.variants?.[0]?.price || 0;
              const oldPrice = (productPrice * 1.2).toFixed(2); // Simulate 20% higher old price

              return (
                <div
                  key={product.slug || product.title + index} // Use slug for key if available, fallback to title+index
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] relative group"
                >
                  {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      -21%
                    </span>
                  )}
                  {isNew && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      New
                    </span>
                  )}

                  <Link
                    href={`/products/${product.slug || "#"}`}
                    className="block"
                  >
                    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          product.images?.[0] ||
                          `https://placehold.co/150x150/E0E0E0/333333?text=Product+${index}`
                        }
                        alt={product.title}
                        className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://placehold.co/150x150/E0E0E0/333333?text=Image+Error`;
                        }}
                      />
                    </div>
                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      {renderStars(product._id)}
                      <h3 className="text-sm font-semibold text-gray-800 mt-2 mb-2 leading-tight">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline space-x-2 mt-auto">
                        <span className="text-sm font-bold text-gray-900">
                          ${productPrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-sm text-gray-500 line-through">
                            ${oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button className="p-1 bg-gray-100 rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700 transition-colors duration-200 shadow-sm">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
      <div>
        {meta && meta.totalPage > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={createPageURL(Math.max(1, meta.page - 1))}
                    isActive={meta.page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: meta.totalPage }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={createPageURL(i + 1)}
                      isActive={meta.page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={createPageURL(
                      Math.min(meta.totalPage, meta.page + 1)
                    )}
                    isActive={meta.page === meta.totalPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};
