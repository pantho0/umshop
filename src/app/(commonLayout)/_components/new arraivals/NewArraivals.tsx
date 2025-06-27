/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Star } from "lucide-react";
import productsData from "../../../../../public/product/product.json"; // Adjust path as needed

// Define interface for Product data
interface Product {
  title: string;
  parentCategory: string;
  subCategory: string;
  variant_color: string[];
  size: string[];
  details: string;
  price: number;
  images: string[];
}

const NewArraivals: React.FC = () => {
  // Ensure productsData is typed correctly
  const products: Product[] = productsData as Product[];

  // Take the first product as the featured one
  const featuredProduct = products[0];
  // Take the next 6 products for the grid, or fewer if not enough
  const gridProducts = products.slice(1, 7); // Get products from index 1 to 6 (7 is exclusive)

  // Helper for star ratings (placeholder for now)
  const renderStars = (rating: number) => {
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
    return <div className="flex">{stars}</div>;
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-10 max-w-7xl">
      <h2 className="text-lg md:text-4xl font-semibold  text-gray-900 mb-8 md:mb-10">
        New arrivals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Featured Product (Left Column - spans 1 or 2 columns on large screens) */}
        {featuredProduct && (
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
                From ${featuredProduct.price.toFixed(2)}
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
        )}

        {/* Product Grid (Right Columns - spans 2 columns on large screens) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {gridProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg  overflow-hidden flex items-center p-4 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
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
                <div className="flex items-center text-sm text-gray-500 mb-2 text-sm">
                  {renderStars(Math.floor(Math.random() * 3) + 3)}{" "}
                  {/* Random stars 3-5 */}
                  <span className="ml-2">
                    ({Math.floor(Math.random() * 200) + 10})
                  </span>{" "}
                  {/* Random review count */}
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className=" font-bold text-gray-900 text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  {/* Example of a flash sale price (optional) */}
                  {index % 2 === 0 && ( // Apply flash sale to every other product for demo
                    <span className="text-sm text-gray-500 line-through ">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArraivals;
