/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

const DiscountBanner: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      {/* Main container: No background color, rounded corners, shadow, flex layout */}
      <div className="relative rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row items-stretch justify-between">
        {/* Left Section: Discount Percentage */}
        <div
          className="relative flex-shrink-0 w-full md:w-1/3 bg-blue-200 p-6 md:p-8 text-center md:text-left flex items-center justify-center
                     
                     /* Desktop Styles (md: prefix) */
                     md:border-r-2 md:border-dashed md:border-white
                     md:before:content-[''] md:before:absolute md:before:top-0 md:before:right-0 md:before:-translate-y-1/2 md:before:w-4 md:before:h-4 md:before:bg-gray-50 md:before:rounded-full
                     md:after:content-[''] md:after:absolute md:after:bottom-0 md:after:right-0 md:after:translate-y-1/2 md:after:w-4 md:after:h-4 md:after:bg-gray-50 md:after:rounded-full
                     md:rounded-l-lg md:rounded-r-none

                     /* Mobile Styles (no md: prefix) */
                     border-b-2 border-dashed border-white
                     before:content-[''] before:absolute before:bottom-0 before:left-0 before:-translate-x-1/2 before:translate-y-1/2 before:w-4 before:h-4 before:bg-gray-50 before:rounded-full
                     after:content-[''] after:absolute after:bottom-0 after:right-0 after:translate-x-1/2 after:translate-y-1/2 after:w-4 after:h-4 after:bg-gray-50 after:rounded-full
                     rounded-t-lg rounded-b-none
                     "
        >
          <h3 className="text-5xl  md:text-7xl font-extrabold text-gray-800 leading-none">
            20<span className="text-3xl md:text-4xl align-super">%</span>
            <span className="block text-xl md:text-2xl font-semibold mt-1">
              OFF
            </span>
          </h3>
        </div>

        {/* Right Section: Sale Details and Image */}
        <div
          className="flex-grow bg-blue-200 p-6 md:p-0 text-center md:text-left flex flex-col md:flex-row items-center justify-around
                     
                     /* Desktop Styles (md: prefix) */
                     md:border-l-2 md:border-dashed md:border-white
                     md:before:content-[''] md:before:absolute md:before:top-0 md:before:left-0 md:before:-translate-y-1/2 md:before:w-4 md:before:h-4 md:before:bg-gray-50 md:before:rounded-full
                     md:after:content-[''] md:after:absolute md:after:bottom-0 md:after:left-0 md:after:translate-y-1/2 md:after:w-4 md:after:h-4 md:after:bg-gray-50 md:after:rounded-full
                     md:rounded-r-lg md:rounded-l-none

                     /* Mobile Styles (no md: prefix) */
                     rounded-b-lg rounded-t-none
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
              src="https://placehold.co/200x150/A0A0A0/FFFFFF?text=Camcorder" // Placeholder for the camcorder image
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
