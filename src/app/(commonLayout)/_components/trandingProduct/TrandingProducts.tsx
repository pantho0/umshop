/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import productsData from "../../../../../public/product/product.json"; // Adjust path as needed

// Define interface for Product data (re-using the one from ProductGridSection)
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

const TrandingProducts: React.FC = () => {
  const products: Product[] = productsData as Product[];

  // For demonstration, let's pick some products and simulate badges/discounts
  //   const trendingProducts: Product[] = [
  //     // Example products, you can customize which ones appear here
  //     {
  //       ...products[5],
  //       title: "VRB01 Virtual Reality Glasses",
  //       price: 340.99,
  //       details: "Immersive VR experience.",
  //       images: ["https://placehold.co/150x150/F0F0F0/333333?text=VR+Glasses"],
  //     }, // Custom product for VR Glasses
  //     {
  //       ...products[3],
  //       title: "Apple iPhone 14 128GB White",
  //       price: 899.0,
  //       details: "Powerful smartphone.",
  //       images: ["https://placehold.co/150x150/E0E0E0/333333?text=iPhone+14"],
  //     },
  //     {
  //       ...products[9],
  //       title: "Smart Watch Series 7, White",
  //       price: 429.0,
  //       details: "Advanced smartwatch.",
  //       images: ["https://placehold.co/150x150/D0D0D0/333333?text=Smart+Watch"],
  //     },
  //     {
  //       ...products[0],
  //       title: "Laptop Apple MacBook Pro 13 M2",
  //       price: 1200.0,
  //       details: "High-performance laptop.",
  //       images: ["https://placehold.co/150x150/C0C0C0/333333?text=MacBook+Pro"],
  //     },
  //     {
  //       ...products[4],
  //       title: "Tablet Apple iPad Air M1",
  //       price: 540.0,
  //       details: "Lightweight iPad.",
  //       images: ["https://placehold.co/150x150/B0B0B0/333333?text=iPad+Air"],
  //     },
  //     {
  //       ...products[8],
  //       title: "Headphones Apple AirPods 2 Pro",
  //       price: 224.0,
  //       details: "Premium wireless earbuds.",
  //       images: ["https://placehold.co/150x150/A0A0A0/333333?text=AirPods+Pro+2"],
  //     },
  //     {
  //       ...products[4],
  //       title: "Tablet Apple iPad Pro M1",
  //       price: 640.0,
  //       details: "Powerful iPad Pro.",
  //       images: ["https://placehold.co/150x150/909090/333333?text=iPad+Pro"],
  //     },
  //     {
  //       ...products[7],
  //       title: "Wireless Bluetooth Headphones Sony",
  //       price: 299.0,
  //       details: "Comfortable over-ear headphones.",
  //       images: [
  //         "https://placehold.co/150x150/808080/333333?text=Sony+Headphones",
  //       ],
  //     },
  //   ];

  // Helper for star ratings
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
        <a
          href="#"
          className="text-purple-600 hover:text-purple-800 font-semibold flex items-center transition-colors duration-200"
        >
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {products.slice(0, 8).map((product, index) => {
          // Simulate badges and prices
          const hasDiscount = index === 0; // First product has discount
          const isNew = index === 3; // Fourth product is 'New'
          const oldPrice = hasDiscount
            ? (product.price / 0.79).toFixed(2)
            : null; // Simulate -21% discount
          const displayPrice = product.price.toFixed(2);
          const randomRating = Math.floor(Math.random() * 3) + 3; // Random 3-5 stars
          const randomReviewCount = Math.floor(Math.random() * 200) + 10; // Random 10-209 reviews

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
              <div className="relative w-full h-48  flex items-center justify-center overflow-hidden">
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
                    ${displayPrice}
                  </span>
                  {oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${oldPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="p-4 border-t border-gray-100 flex justify-end">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700 transition-colors duration-200 shadow-sm">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrandingProducts;
