/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Star, ChevronRight, EyeIcon } from "lucide-react";

// Import Shadcn UI Carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IProductResult } from "@/interface";
import Link from "next/link";

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

const SpecialOffersSection: React.FC<{
  products: IProductResult[] | undefined;
}> = ({ products }) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 12); // Set target 12 days from now

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
        <div className="flex flex-col  md:flex-row items-center">
          <h2 className="text-3xl text-center mb-2 md:text-4xl font-semibold text-gray-900 mr-4">
            Special offers for you
          </h2>
          <CountdownTimer targetDate={targetDate} />
        </div>
        <Link
          href="/products"
          className="text-purple-600 hover:text-purple-800 font-semibold flex items-center transition-colors duration-200"
        >
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
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
          {products!.slice(0, 8).map((product, index) => {
            // const oldPrice = (
            //   (product.variants?.[0].price as any) * 1.2
            // ).toFixed(2); // Simulate 20% higher old price
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
                  <Link href={`/products/${product.slug}`}>
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
                    <div className="p-1 md:p-4 flex flex-col flex-grow">
                      {renderStars(product.title)}
                      <h3 className="text-[12px] md:text-lg font-semibold text-gray-800 mt-2 mb-2 leading-tight">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline space-x-2 mt-auto">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.variants?.[0].price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {/* ${oldPrice} */}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Available:{" "}
                        <span className="font-semibold">{availableCount}</span>
                      </p>
                    </div>
                  </Link>

                  {/*view product button */}
                  {/* <div className="p-4 border-t border-gray-100 flex justify-end">
                    <Link href={`/products/${product.slug}`}>
                      <button className="p-2 bg-gray-100 cursor-pointer rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700 transition-colors duration-200 shadow-sm">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </Link>
                  </div> */}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="">
          <CarouselPrevious className="left-4" />{" "}
          {/* Position arrows outside */}
          <CarouselNext className="right-4" /> {/* Position arrows outside */}
        </div>
      </Carousel>
    </section>
  );
};

export default SpecialOffersSection;
