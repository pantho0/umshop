/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart, X } from "lucide-react"; // Import X for remove item button
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const cartItems: CartItem[] = [
    {
      id: "prod1",
      name: "Apple iPhone 14 128GB",
      price: 899.0,
      image: "https://placehold.co/40x40/E0E0E0/333333?text=iPhone",
      quantity: 1,
    },
    {
      id: "prod2",
      name: "Tablet Apple iPad Pro M2",
      price: 989.0,
      image: "https://placehold.co/40x40/D0D0D0/333333?text=iPad",
      quantity: 1,
    },
    {
      id: "prod3",
      name: "WH-1000XM5 Headphones",
      price: 349.99,
      image: "https://placehold.co/40x40/C0C0C0/333333?text=Headphones",
      quantity: 2,
    },
    {
      id: "prod4",
      name: "Smart Watch Series 7",
      price: 429.0,
      image: "https://placehold.co/40x40/B0B0B0/333333?text=Watch",
      quantity: 1,
    },
  ];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Function to handle removing an item (dummy)
  const handleRemoveItem = (id: string) => {
    console.log(`Remove item with ID: ${id}`);
    // In a real app, you'd update your cart state/context here
  };

  // Common cart trigger button
  const CartTriggerButton = () => (
    <button className="relative p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
      <ShoppingCart
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="h-5 w-5 text-white"
      />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      direction="right"
    >
      <DrawerTrigger asChild>
        <CartTriggerButton />
      </DrawerTrigger>
      <DrawerContent
        // Drawer content styles: Always fixed, slide from right, full height, max width
        className="w-full max-w-sm h-full fixed top-0 right-2
                   p-4 bg-white shadow-lg flex flex-col" // Added flex-col for layout
      >
        <DrawerHeader className="p-0 pb-4 border-b border-gray-200">
          <div className="w-full flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold text-gray-800">
              Shopping Cart ({totalItems} items)
            </DrawerTitle>
            <DrawerClose asChild>
              <X className="text-red-600 size-6 p-1" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        {/* Removed DrawerDescription as it's not in the image and title/items count is enough */}

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8 flex-grow flex items-center justify-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex-grow overflow-y-auto py-4 space-y-3">
            {" "}
            {/* Scrollable area for items */}
            {cartItems.map((item) => (
              <div // Using a div for cart item content
                key={item.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-default"
              >
                <div className="flex items-center flex-grow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded-md mr-3"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/40x40/E0E0E0/333333?text=Img`;
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 line-clamp-1">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-3 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <DrawerFooter className="p-0 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center px-2 py-1 mb-3">
              <span className="text-base font-semibold text-gray-800">
                Subtotal:
              </span>
              <span className="text-base font-bold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 text-center">
              View Cart
            </Button>
            <Button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200 mt-2 text-center">
              Checkout
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
