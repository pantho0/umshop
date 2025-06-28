/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Truck,
  Clock,
  CreditCard,
  Copy,
  ChevronRight,
  Star,
  ShoppingCart,
} from "lucide-react";
import Products from "../../../../public/product/product.json"; // Re-use ProductType

const PaymentSuccessPage: React.FC = () => {
  const orderId = "234000"; // Dummy Order ID
  const deliveryAddress = "567 Cherry Souse Lane Sacramento, 95829"; // Dummy Address
  const deliveryTime = "Sunday, May 9, 12:00 - 14:00"; // Dummy Time
  const paymentMethod = "Cash on delivery"; // Dummy Payment Method
  const couponCode = "30%SALEOFF"; // Dummy Coupon Code

  // Dummy "You may also like" products
  const recommendedProducts = [
    {
      ...Products[5],
      title: "VRB01 Virtual Reality Glasses",
      price: 340.99,
      details: "Immersive VR experience.",
      images: ["https://placehold.co/150x150/F0F0F0/333333?text=VR+Glasses"],
    },
    {
      ...Products[3],
      title: "Apple iPhone 14 128GB Blue",
      price: 899.0,
      details: "Powerful smartphone.",
      images: ["https://placehold.co/150x150/E0E0E0/333333?text=iPhone+14"],
    },
  ];

  const handleCopyCoupon = () => {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        alert("Coupon code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy coupon code.");
      });
  };

  // Helper for star ratings (re-used from other components)
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
    <div className="font-inter antialiased min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Order Confirmation and Details */}
          <div className="lg:w-2/3 bg-white rounded-lg border border-gray-200  p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CheckCircle2 className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-gray-600 text-sm">Order #{orderId}</p>
                  <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                    Thank you for your order!
                  </h1>
                </div>
              </div>
              <Button
                variant="link"
                className="text-purple-600 hover:underline"
              >
                Track order
              </Button>
            </div>

            <Separator className="my-6 bg-gray-200" />

            <div className="space-y-6">
              {/* Delivery Info */}
              <div>
                <h2 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                  <Truck className="h-5 w-5 text-gray-600 mr-2" /> Delivery
                </h2>
                <p className="text-gray-700 pl-7">{deliveryAddress}</p>
              </div>

              {/* Time Info */}
              <div>
                <h2 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                  <Clock className="h-5 w-5 text-gray-600 mr-2" /> Time
                </h2>
                <p className="text-gray-700 pl-7">{deliveryTime}</p>
              </div>

              {/* Payment Info */}
              <div>
                <h2 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-600 mr-2" /> Payment
                </h2>
                <p className="text-gray-700 pl-7">{paymentMethod}</p>
              </div>
            </div>

            <Separator className="my-6 bg-gray-200" />

            {/* Congratulations Coupon */}
            <div className="bg-green-50 text-green-800 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between shadow-sm">
              <div className="flex items-center mb-4 md:mb-0">
                <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0" />
                <p className="font-semibold text-lg">
                  Congratulations! 30% off your new purchase!
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <Input
                  type="text"
                  value={couponCode}
                  readOnly
                  className="flex-grow bg-white border-green-300 text-green-800 rounded-r-none focus:ring-0 focus:border-green-300"
                />
                <Button
                  onClick={handleCopyCoupon}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-l-none"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy coupon
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Use the coupon now or look for it in your personal account.
            </p>

            <div className="mt-8 text-gray-600 text-sm">
              Need help?{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Contact us
              </a>
            </div>
          </div>

          {/* Right Column: You May Also Like */}
          <aside className="lg:w-1/3 bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              You may also like
            </h2>
            <div className="space-y-6">
              {recommendedProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <img
                    src={
                      product.images[0] ||
                      `https://placehold.co/80x80/E0E0E0/333333?text=Product`
                    }
                    alt={product.title}
                    className="w-20 h-20 object-contain rounded-md mr-4 flex-shrink-0"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/80x80/E0E0E0/333333?text=Image+Error`;
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 text-base leading-tight">
                      {product.title}
                    </h3>
                    {renderStars(
                      Math.floor(Math.random() * 3) + 3,
                      Math.floor(Math.random() * 200) + 10
                    )}
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-purple-700"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center justify-center mt-8">
              Continue shopping <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
