/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Star } from "lucide-react";
import { Product } from "@/interface";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export const NewArraivalsClient = ({ products }: { products: Product[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [ratings, setRatings] = useState<{ [key: string]: number }>(() => {
    // Initialize with deterministic ratings based on product ID
    return products.reduce((acc, product) => {
      // Create a deterministic rating between 3-5 based on product ID
      const hash = simpleHash(product._id);
      acc[product._id] = (hash % 3) + 3; // Will be 3, 4, or 5
      return acc;
    }, {} as { [key: string]: number });
  });

  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 7);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
      {/* Featured Product (Left Column - spans 1 or 2 columns on large screens) */}
      {featuredProduct && (
        <Link href={`/products/${featuredProduct.slug}`}>
          <div className="lg:col-span-1 bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col justify-end p-6 md:p-12 relative min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
            {/* Background Image */}
            <img
              src={
                featuredProduct.images[0] ||
                "https://placehold.co/600x400/333333/FFFFFF?text=Featured+Product"
              }
              alt={featuredProduct.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/600x400/333333/FFFFFF?text=Image+Error`;
              }}
            />
            {/* Overlay for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

            <div className="relative z-10 text-white mt-auto">
              <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-2">
                {featuredProduct.title}
              </h3>
              <p className="text-lg md:text-xl text-gray-200 mb-4">
                {featuredProduct.details.split(".")[0]}.
              </p>
              <button className="px-6 py-3 bg-red-500 text-white text-base font-semibold rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center">
                From ${featuredProduct?.variants?.[0]?.price.toFixed(2)}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </Link>
      )}

      {/* Product Grid (Right Columns - spans 2 columns on large screens) */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3">
        {gridProducts?.map((product, index) => (
          <Link key={index} href={`/products/${product.slug}`}>
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm  overflow-hidden flex items-center p-4 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <img
                src={
                  product.images[0] ||
                  "https://placehold.co/100x100/E0E0E0/333333?text=Product"
                }
                alt={product.title}
                className="w-24 h-24 object-contain rounded-md mr-4 flex-shrink-0"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/100x100/E0E0E0/333333?text=Image+Error`;
                }}
              />
              <div className="flex-grow">
                <h4 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                  {product.title}
                </h4>
                <div className="flex items-center text-gray-500 mb-2 text-sm">
                  {renderStars(product._id)}
                  <span className="ml-2">
                    {/* Deterministic review count based on product ID */}(
                    {(simpleHash(product._id) % 200) + 10})
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className=" font-bold text-gray-900 text-sm">
                    ${product.variants?.[0].price.toFixed(2)}
                  </span>
                  {/* Example of a flash sale price (optional) */}
                  {index % 2 === 0 && ( // Apply flash sale to every other product for demo
                    <span className="text-sm text-gray-500 line-through ">
                      ${(product.variants?.[0].price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
