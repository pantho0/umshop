/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import productsData from "../../../../../public/product/product.json"; // Adjust path as needed

// Import Shadcn UI Carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

// Helper for star ratings
const renderStars = (title: string) => {
  // Generate consistent rating and review count based on title
  const rating = (simpleHash(title) % 3) + 3; // 3-5 stars
  const reviewCount = (simpleHash(title) % 200) + 10; // 10-209 reviews
  
  return (
    <div className="flex items-center text-sm text-gray-500">
      <div className="flex mr-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span>({reviewCount})</span>
    </div>
  );
};

// Countdown Timer Component
interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval as keyof typeof timeLeft]) {
      timerComponents.push(
        <span
          key={interval}
          className="bg-green-700 text-white text-xs font-bold px-3 py-3 rounded-md mr-1"
        >
          {timeLeft[interval as keyof typeof timeLeft]}
          {interval.charAt(0)}
        </span>
      );
    }
  });

  return (
    <div className="flex items-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-gray-500 text-sm">Time&lsquo;s up!</span>
      )}
    </div>
  );
};

const SpecialOffersSection: React.FC = () => {
  const products: Product[] = productsData as Product[];

  // Select a subset of products for special offers
  //   const specialOfferProducts: Product[] = [
  //     {
  //       ...products[8],
  //       title: "Xiaomi Wireless Buds Pro",
  //       price: 129.99,
  //       details: "Premium wireless earbuds with ANC.",
  //       images: ["https://placehold.co/150x150/F0F0F0/333333?text=Xiaomi+Buds"],
  //     },
  //     {
  //       ...products[9],
  //       title: "Smart Watch Series 7, White",
  //       price: 429.0,
  //       details: "Advanced smartwatch with health tracking.",
  //       images: ["https://placehold.co/150x150/E0E0E0/333333?text=Smart+Watch"],
  //     },
  //     {
  //       ...products[17],
  //       title: "VRB01 Camera Nikon Max",
  //       price: 652.0,
  //       details: "Professional camera for stunning photos.",
  //       images: ["https://placehold.co/150x150/D0D0D0/333333?text=Nikon+Max"],
  //     },
  //     {
  //       ...products[3],
  //       title: "Apple iPhone 14 128GB Blue",
  //       price: 899.0,
  //       details: "Latest iPhone model in a new color.",
  //       images: [
  //         "https://placehold.co/150x150/C0C0C0/333333?text=iPhone+14+Blue",
  //       ],
  //     },
  //     {
  //       ...products[0],
  //       title: "Laptop Apple MacBook Pro 13 M2",
  //       price: 1200.0,
  //       details: "Powerful and portable MacBook Pro.",
  //       images: [
  //         "https://placehold.co/150x150/B0B0B0/333333?text=MacBook+Pro+13",
  //       ],
  //     },
  //     {
  //       ...products[4],
  //       title: "Tablet Apple iPad Air M1",
  //       price: 540.0,
  //       details: "Lightweight and powerful tablet.",
  //       images: ["https://placehold.co/150x150/A0A0A0/333333?text=iPad+Air+M1"],
  //     },
  //     {
  //       ...products[7],
  //       title: "Headphones Apple AirPods 2 Pro",
  //       price: 224.0,
  //       details: "Noise-cancelling AirPods for immersive sound.",
  //       images: ["https://placehold.co/150x150/909090/333333?text=AirPods+Pro+2"],
  //     },
  //     {
  //       ...products[10],
  //       title: "Wireless Bluetooth Headphones Sony",
  //       price: 299.0,
  //       details: "Comfortable over-ear headphones with long battery life.",
  //       images: [
  //         "https://placehold.co/150x150/808080/333333?text=Sony+Headphones",
  //       ],
  //     },
  //   ];

  // For countdown timer (e.g., 12 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 12); // Set target 12 days from now

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center">
          <h2 className="text-lg md:text-4xl font-semibold text-gray-900 mr-4">
            Special offers for you
          </h2>
          <CountdownTimer targetDate={targetDate} />
        </div>
        <a
          href="#"
          className="text-purple-600 hover:text-purple-800 font-semibold flex items-center transition-colors duration-200"
        >
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      {/* Shadcn UI Carousel Integration */}
      <Carousel
        opts={{
          align: "start",
          loop: true, // Optional: loop the carousel
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {" "}
          {/* Adjust margin for gap */}
          {products.slice(0, 8).map((product, index) => {
            const oldPrice = (product.price * 1.2).toFixed(2); // Simulate 20% higher old price
            // Generate consistent available count based on product title
            const availableCount = (simpleHash(product.title) % 100) + 1; // 1-100 available

            return (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
              >
                {" "}
                {/* Responsive item width */}
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] relative group h-full" // Ensure full height
                >
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
                    {renderStars(product.title)}
                    <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-2 leading-tight">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-auto">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${oldPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Available:{" "}
                      <span className="font-semibold">{availableCount}</span>
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700 transition-colors duration-200 shadow-sm">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-12" />{" "}
        {/* Position arrows outside */}
        <CarouselNext className="-right-12" /> {/* Position arrows outside */}
      </Carousel>
    </section>
  );
};

export default SpecialOffersSection;
