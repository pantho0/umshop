/* eslint-disable @next/next/no-img-element */

"use client";
import React from "react";

const DiscountBanner: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      {/* Removed bg-blue-100 from here. Changed items-center to items-stretch for height matching. */}
      <div className="relative rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row items-stretch justify-between">
        {/* Left Section: Discount Percentage */}
        <div
          className="relative flex-shrink-0 w-full md:w-1/3 bg-blue-200 p-6 md:p-8 text-center md:text-left flex items-center justify-center
                    border-r-3 border-dashed border-white
                    before:content-[''] before:absolute before:top-0 before:right-0 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rounded-full
                    after:content-[''] after:absolute after:bottom-0 after:right-0 after:translate-y-1/2 after:w-4 after:h-4 after:bg-white after:rounded-full
                    md:rounded-l-lg md:rounded-r-none rounded-t-lg rounded-b-none md:rounded-bl-lg md:rounded-tr-none
                    "
        >
          <h3 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-none">
            20<span className="text-3xl md:text-4xl align-super">%</span>
            <span className="block text-xl md:text-2xl font-semibold mt-1">
              OFF
            </span>
          </h3>
        </div>

        {/* Right Section: Sale Details and Image */}
        <div
          className="flex-grow bg-blue-200 p-6 md:p-0 text-center md:text-left flex flex-col md:flex-row items-center justify-around 
                    border-l-2 border-dashed border-blue-300
                    before:content-[''] before:absolute before:top-0 before:left-0 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rounded-full
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-1/2 after:w-4 after:h-4 after:bg-white after:rounded-full
                    md:rounded-r-lg md:rounded-l-none rounded-b-lg rounded-t-none md:rounded-tl-none md:rounded-br-lg
                    "
        >
          <div className="mb-4 md:mb-0 md:mr-8">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              SEASONAL WEEKLY SALE 2024
            </h4>
            <p className="text-gray-600 text-base md:text-lg">
              Use code{" "}
              <span className="font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-md">
                Sale 2024
              </span>{" "}
              to get best offer
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://media.macphun.com/img/uploads/macphun/blog/1110/best-hdr-camera1x.jpg" // Placeholder for the camcorder image
              alt="Camcorder"
              className="w-48 md:w-64 h-36 object-contain transform rotate-6 hover:rotate-0 transition-transform duration-300 ease-in-out"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/200x150/A0A0A0/FFFFFF?text=Image+Error`;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountBanner;
