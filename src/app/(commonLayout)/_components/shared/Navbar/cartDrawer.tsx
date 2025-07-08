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
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromCart, getCartItems } from "@/redux/features/cartSlice";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartItems: CartItem[] = useAppSelector((state) => getCartItems(state));
  const dispatch = useAppDispatch();

  const subtotal = React.useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 0)),
      0
    );
  }, [cartItems]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const CartTriggerButton = () => (
    <button className="relative p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
      <ShoppingCart
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="h-5 w-5 text-white"
      />
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {cartItems.length}
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
        className="w-full max-w-sm h-full fixed top-0 right-2
                   p-4 bg-white shadow-lg flex flex-col"
      >
        <DrawerHeader className="p-0 pb-4 border-b border-gray-200">
          <div className="w-full flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold text-gray-800">
              Shopping Cart ({cartItems.length} items)
            </DrawerTitle>
            <DrawerClose asChild>
              <X className="text-red-600 size-6 p-1" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8 flex-grow flex items-center justify-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex-grow overflow-y-auto py-4 space-y-3">
            {cartItems.map((item) => (
              <div
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
                  onClick={() => removeFromCartHandler(item.id)}
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
            <Link href="/cart">
              <Button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 text-center"
              >
                View Cart
              </Button>
            </Link>
            <Button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200 mt-2 text-center"
            >
              Checkout
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
