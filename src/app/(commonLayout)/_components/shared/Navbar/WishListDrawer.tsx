/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromCart, getCartItems } from "@/redux/features/cartSlice";
import Link from "next/link";
import { IWishlist, removeFromWishlist } from "@/redux/features/wishListSlice";

const WishListDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const persistedWishList: IWishlist[] = useAppSelector(
    (state) => state.persisted.wishlist
  );
  const dispatch = useAppDispatch();

  const handleRemoveItem = (customId: string) => {
    dispatch(removeFromWishlist(customId));
  };

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const WishListTrigger = () => (
    <button
      className="relative p-1 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
    >
      <Heart className="h-5 w-5 text-white" />
      {isMounted && persistedWishList.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
          {persistedWishList.length}
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
        <WishListTrigger />
      </DrawerTrigger>
      <DrawerContent
        className="w-full max-w-sm h-full fixed top-0 right-2
                   p-4 bg-white shadow-lg flex flex-col"
      >
        <DrawerHeader className="p-0 pb-4 border-b border-gray-200">
          <div className="w-full flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold text-gray-800">
              Wish List ({persistedWishList.length} items)
            </DrawerTitle>
            <DrawerClose asChild>
              <X className="text-red-600 size-6 p-1" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {persistedWishList.length === 0 ? (
          <p className="text-gray-500 text-center py-8 flex-grow flex items-center justify-center">
            Your Wish List is empty.
          </p>
        ) : (
          <div className="flex-grow overflow-y-auto py-4 space-y-3">
            {persistedWishList.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                onClick={() => setIsDrawerOpen(false)}
              >
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-default">
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
              </Link>
            ))}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default WishListDrawer;
