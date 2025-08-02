/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Star, ChevronRight, EyeIcon } from "lucide-react";
import { IProductResult } from "@/interface";
import Link from "next/link";

const TrandingProducts: React.FC<{ products: IProductResult[] }> = ({
  products,
}) => {
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

  // Get consistent rating based on product title
  const getRating = (title: string) => (simpleHash(title) % 3) + 3; // 3-5 stars

  // Get consistent review count based on product title
  const getReviewCount = (title: string) => (simpleHash(title) % 200) + 50; // 50-250 reviews

  // Helper for star ratings
  const renderStars = (title: string) => {
    const rating = getRating(title);
    const reviewCount = getReviewCount(title);

    return (
      <div className="flex items-center text-[9px] text-gray-500">
        <div className="flex mr-1" aria-label={`${rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <span>({reviewCount})</span>
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-lg md:text-4xl font-semibold text-gray-900">
          Trending products
        </h2>
        <Link
          href="/products"
          className="text-purple-600 hover:text-purple-800 font-semibold flex items-center transition-colors duration-200"
        >
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-10">
        {products.slice(0, 8).map((product, index) => {
          // Simulate badges and prices
          const hasDiscount = index === 0; // First product has discount
          const isNew = index === 3; // Fourth product is 'New'
          // const oldPrice = hasDiscount
          //   ? (product.variants?.[0].price / 0.79).toFixed(2)
          //   : null; // Simulate -21% discount
          const displayPrice = product.variants?.[0].price.toFixed(2);
          // Use deterministic values based on product title
          // const rating = getRating(product.title);
          // const reviewCount = getReviewCount(product.title);

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] relative group"
            >
              {/* Badges */}
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

              {/* Product Image */}
              <Link href={`/products/${product.slug}`}>
                <div className="relative w-full h-24 md:h-48  flex items-center justify-center overflow-hidden">
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
                  {renderStars(product.title)}
                  <h3 className="text-[12px]  md:text-sm font-semibold text-gray-800 mt-2 mb-2 leading-tight">
                    {product.title}
                  </h3>
                  <div className="flex items-baseline space-x-2 mt-auto">
                    <span className="text-sm font-bold text-gray-900">
                      ${displayPrice}
                    </span>
                    {/* {oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${oldPrice}
                      </span>
                    )} */}
                  </div>
                </div>
              </Link>

              {/* view product button */}
              {/* <div className="p-4 border-t border-gray-100 flex justify-end">
                <Link href={`/products/${product.slug}`}>
                  <button className="p-2 bg-gray-100 cursor-pointer rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700 transition-colors duration-200 shadow-sm">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </Link>
              </div> */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrandingProducts;
