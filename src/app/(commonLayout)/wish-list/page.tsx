"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { X, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromWishlist } from "@/redux/features/wishListSlice";
import Image from "next/image";
import Link from "next/link";
import { IWishlist } from "@/redux/features/wishListSlice";

const WishListPage: React.FC = () => {
  const persistedWishList: IWishlist[] = useAppSelector(
    (state) => state.persisted.wishlist
  );
  const dispatch = useAppDispatch();

  const handleRemoveItem = (customId: string) => {
    dispatch(removeFromWishlist(customId));
  };

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-8 w-8 text-rose-500" />
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
            Your Wish List
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {persistedWishList.length > 0 ? (
              persistedWishList.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="p-0 relative">
                    <div className="relative aspect-square">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.customId!)}
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white"
                    >
                      <X className="h-4 w-4 text-rose-500" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Model: {item.model}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      {/* <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span> */}
                      {item.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${item.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your wish list is empty
                </h3>
                <p className="text-gray-500">
                  Add items to your wish list to see them here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
