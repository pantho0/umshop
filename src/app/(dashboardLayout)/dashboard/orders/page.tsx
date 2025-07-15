"use client";

import React, { useState, useEffect } from "react";
import { useGetAllOrders } from "@/hooks/order.hook";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { IOrder } from "@/interface"; // Assuming IOrder is correctly defined here
import OrderDataTable from "../../_components/order/OrderDataTable";
import { OrderDataMobileView } from "../../_components/order/OrderDataMobileView";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (runs only on client-side)
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);

      // Cleanup function to remove the event listener when the component unmounts
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [query]);
  return matches;
}

const OrdersPage = () => {
  // Fetch order data using your custom hook
  const { data, isLoading } = useGetAllOrders();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-700 font-medium">Loading orders....</p>
      </div>
    );
  }

  // Ensure orders data is an array, defaulting to an empty array if null/undefined.
  const ordersData: IOrder[] | any = data?.data;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <h1 className="text-4xl font-extrabold mb-8 text-center md:text-left text-gray-900">
        Your Orders
      </h1>

      {ordersData?.length === 0 ? (
        // Display a message if no orders are found.
        <div className="flex justify-center items-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-xl text-gray-600 font-medium">No orders found.</p>
        </div>
      ) : isDesktop ? (
        // --- Desktop (Medium and Large Screens): Shadcn Table (Manual Rendering) ---
        <div className="w-full">
          <div className="rounded-md border shadow-sm">
            <OrderDataTable ordersData={ordersData} />
          </div>
        </div>
      ) : (
        // --- Mobile/Tablet (Small Screens): Shadcn Cards ---
        <OrderDataMobileView ordersData={ordersData} />
      )}
    </div>
  );
};
export default OrdersPage;
