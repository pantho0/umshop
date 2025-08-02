"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import Shadcn Table components
import { Minus, Plus, X, Percent, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";

// Define a type for a cart item
interface CartItem {
  id: string;
  customId?: string;
  name: string;
  image: string;
  color: string;
  model: string;
  price: number;
  oldPrice?: number; // Optional old price for discounted items
  quantity: number;
}

const ShoppingCartPage: React.FC = () => {
  const cartItems: CartItem[] = useAppSelector((state) => state.persisted.cart);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (
    customId: string,

    type: "increment" | "decrement"
  ) => {
    if (type === "increment") {
      dispatch(increaseQuantity(customId));
    } else {
      dispatch(decreaseQuantity(customId));
    }
  };

  const handleRemoveItem = (customId: string) => {
    dispatch(removeFromCart(customId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const saving = 0.0;
  const taxCollected = 0.0;
  const shippingCost = "Calculated at checkout";

  const estimatedTotal = subtotal - saving + taxCollected;

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">
          Shopping cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Cart Items (using Shadcn Table) */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="w-[40%] text-gray-600 font-semibold">
                      Product
                    </TableHead>
                    <TableHead className="w-[15%] text-right text-gray-600 font-semibold">
                      Unit Price
                    </TableHead>
                    <TableHead className="w-[20%] text-right text-gray-600 font-semibold">
                      Quantity
                    </TableHead>
                    <TableHead className="w-[15%] text-right text-gray-600 font-semibold">
                      Total
                    </TableHead>
                    <TableHead className="w-[10%] text-gray-600 font-semibold text-right">
                      {/* For remove button */}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow
                      key={item.customId}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      {/* Product Info */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-contain rounded-md mr-4"
                          />
                          <div>
                            <h3 className="text-sm md:text-sm font-semibold  text-ellipsis whitespace-nowrap text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Color: {item.color}
                            </p>
                            <p className="text-sm text-gray-600">
                              Model: {item.model}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Unit Price */}
                      <TableCell className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-right text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.oldPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${item.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Quantity */}
                      <TableCell className="py-4 px-4">
                        <div className="flex justify-end">
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(
                                  item.customId!,
                                  "decrement"
                                )
                              }
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
                              onClick={() =>
                                handleQuantityChange(
                                  item.customId!,
                                  "increment"
                                )
                              }
                              className="h-8 w-8 rounded-none"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>

                      {/* Total */}
                      <TableCell className="py-4 px-4 text-right font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>

                      {/* Remove Button */}
                      <TableCell className="py-4 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.customId!)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden space-y-4 p-4">
              {cartItems.map((item) => (
                <div
                  key={item.customId}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain rounded-md mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-600">
                          Model: {item.model}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 justify-between gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Unit Price</p>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${item.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Quantity</p>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item.id, "decrement")
                        }
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
                        onClick={() =>
                          handleQuantityChange(item.id, "increment")
                        }
                        className="h-8 w-8 rounded-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <aside className="lg:w-1/3 bg-[#F5F7FA] rounded-lg shadow-md p-6">
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

            <Link href="/checkout">
              <Button className="w-full bg-red-500 cursor-pointer text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center justify-center">
                Proceed to checkout <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

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
          <Link
            href="/products"
            className="text-purple-600 hover:underline flex items-center justify-center"
          >
            <ChevronRight className="rotate-180 mr-2 h-4 w-4" /> Continue
            shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
