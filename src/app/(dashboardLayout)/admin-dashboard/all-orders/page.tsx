"use client";

import React, { useState, useEffect } from "react";
import { useGetAllOrders } from "@/hooks/order.hook";

import { IOrderResult } from "@/interface"; // Assuming IOrder is correctly defined here
import OrderDataTable from "../../_components/order/OrderDataTable";
import { OrderDataMobileView } from "../../_components/order/OrderDataMobileView";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const [filters, setFilters] = useState<{
    searchTerm?: string;
    status?: string;
  }>({});

  // Fetch order data using your custom hook
  const { data, isLoading } = useGetAllOrders(filters);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Ensure orders data is an array, defaulting to an empty array if null/undefined.
  const ordersData: IOrderResult[] | any = data?.data?.data;
  const meta = data?.data?.meta;
  console.log(meta);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <h1 className="text-2xl font-semibold mb-8 text-center md:text-left text-gray-900">
        Your Orders
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search orders..."
          value={filters.searchTerm || ""}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
          className="max-w-sm"
        />
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            setFilters((prev) =>
              value === "all"
                ? { ...prev, status: undefined }
                : { ...prev, status: value }
            )
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In progress">Processing</SelectItem>
            <SelectItem value="Completed">Delivered</SelectItem>
            <SelectItem value="Canceled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setFilters({});
          }}
        >
          Reset Filters
        </Button>
      </div>
      <Separator />

      {ordersData?.length === 0 ? (
        // Display a message if no orders are found.
        <div className="flex justify-center items-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-xl text-gray-600 font-medium">No orders found.</p>
        </div>
      ) : isDesktop ? (
        // --- Desktop (Medium and Large Screens): Shadcn Table (Manual Rendering) ---
        <div className="w-full mt-6">
          <div className="rounded-md border shadow-sm">
            <OrderDataTable ordersData={ordersData} isLoading={isLoading} />
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
