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
import DiscountBanner from "../../_components/discountedSection/DiscountBanner";
import { ProductGridDisplayProps } from "@/interface";
import renderProductCardSkeleton from "@/components/ui/Product/renderProductCardSkeleton";

const renderStars = (rating: number, reviewCount: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return (
    <div className="flex items-center text-sm text-gray-500">
      <div className="flex mr-1">{stars}</div>
      {reviewCount > 0 && <span>({reviewCount})</span>}
    </div>
  );
};

export const ProductGridDisplay: React.FC<ProductGridDisplayProps> = ({
  products,
  currentSortBy,
  isLoading,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`?${params.toString()}`, { scroll: false });
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
              const oldPrice = (product.price * 1.2).toFixed(2); // Simulate 20% higher old price
              const randomRating = Math.floor(Math.random() * 3) + 3; // Random 3-5 stars
              const randomReviewCount = Math.floor(Math.random() * 200) + 10; // Random 10-209 reviews

              // Simulate badges (for demo purposes)
              const hasDiscount = index === 0;
              const isNew = index === 3;

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

                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          product.images[0] ||
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
                      {renderStars(randomRating, randomReviewCount)}
                      <h3 className="text-sm font-semibold text-gray-800 mt-2 mb-2 leading-tight">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline space-x-2 mt-auto">
                        <span className="text-sm font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${oldPrice}
                        </span>
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
        {/* Integrate DiscountBanner after a few products for visual effect */}
        {products.length > 4 &&
          !isLoading && ( // Only show banner when not loading
            <div className="col-span-full mt-8 mb-4">
              <DiscountBanner />
            </div>
          )}
      </div>
    </section>
  );
};
