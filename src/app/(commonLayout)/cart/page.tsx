/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus, X, Percent, ChevronRight } from "lucide-react";

// Define a type for a cart item
interface CartItem {
  id: string;
  title: string;
  image: string;
  color: string;
  model: string;
  price: number;
  oldPrice?: number; // Optional old price for discounted items
  quantity: number;
}

const ShoppingCartPage: React.FC = () => {
  // Dummy cart data for demonstration
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "iphone14",
      title: "Apple iPhone 14 128GB",
      image: "https://placehold.co/80x80/E0E0E0/333333?text=iPhone",
      color: "White",
      model: "128 GB",
      price: 899.0,
      quantity: 1,
    },
    {
      id: "ipadpro",
      title: "Tablet Apple iPad Pro M2",
      image: "https://placehold.co/80x80/D0D0D0/333333?text=iPad",
      color: "Black",
      model: "256 GB",
      price: 989.0,
      oldPrice: 1099.0, // Example of a discounted item
      quantity: 1,
    },
    {
      id: "smartwatch",
      title: "Smart Watch Series 7",
      image: "https://placehold.co/80x80/C0C0C0/333333?text=Watch",
      color: "White",
      model: "44 mm",
      price: 429.0,
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (
    id: string,
    type: "increment" | "decrement"
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (type === "increment") {
            return { ...item, quantity: item.quantity + 1 };
          } else if (type === "decrement" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const saving = 110.0; // Dummy saving
  const taxCollected = 73.4; // Dummy tax
  const shippingCost = "Calculated at checkout"; // As per image

  const estimatedTotal = subtotal - saving + taxCollected;

  return (
    <div className="font-inter antialiased min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">
          Shopping cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:w-2/3 bg-white rounded-lg  overflow-hidden">
            <div className="p-4 border-b border-gray-200 hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_0.5fr] gap-4 text-gray-600 font-semibold">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span></span> {/* For clear cart/remove */}
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_0.5fr] gap-4 p-4 border-b border-gray-200 items-center last:border-b-0"
              >
                {/* Product Info */}
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-sm text-gray-600">Model: {item.model}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col md:block">
                  <span className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2 md:ml-0 block md:inline">
                      ${item.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit md:w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, "decrement")}
                    className="h-8 w-8 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="flex items-center justify-center w-8 text-sm font-semibold text-gray-800 border-x border-gray-300">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, "increment")}
                    className="h-8 w-8 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Total */}
                <span className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                {/* Remove Button */}
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="p-4 flex justify-end">
              <Button
                variant="link"
                className="text-purple-600 hover:underline"
              >
                Clear cart
              </Button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:w-1/3 bg-[#F5F7FA] rounded-lg  p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Order summary
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Saving:</span>
                <span className="font-semibold text-red-500">
                  -${saving.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax collected:</span>
                <span className="font-semibold">
                  ${taxCollected.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">{shippingCost}</span>
              </div>
            </div>

            <Separator className="my-6 bg-gray-200" />

            <div className="flex justify-between items-center text-xl font-semibold text-gray-900 mb-6">
              <span>Estimated total:</span>
              <span>${estimatedTotal.toFixed(2)}</span>
            </div>

            <Button className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center justify-center">
              Proceed to checkout <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-center text-gray-600 mt-4">
              <a href="#" className="text-purple-600 hover:underline">
                Create an account
              </a>{" "}
              and get 239 bonuses
            </p>

            <Separator className="my-6 bg-gray-200" />

            {/* Apply Promo Code Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="promo-code">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  <Percent className="mr-2 h-5 w-5" /> Apply promo code
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="flex space-x-2">
                    <Input placeholder="Promo code" className="flex-grow" />
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Apply
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-purple-600 hover:underline flex items-center justify-center"
          >
            <ChevronRight className="rotate-180 mr-2 h-4 w-4" /> Continue
            shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
