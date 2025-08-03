"use client";

import React, { useState, useEffect } from "react";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IOrderResult, Meta } from "@/interface"; // Assuming IOrder is correctly defined here
import OrderDataTable from "../../_components/order/OrderDataTable";
import { OrderDataMobileView } from "../../_components/order/OrderDataMobileView";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";
import PaginationControls from "@/components/PaginationControls";

const OrdersPage = () => {
  const [filters, setFilters] = useState<{
    searchTerm?: string;
    status?: string;
    page?: number;
    limit?: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetAllOrders(filters);

  const ordersData: IOrderResult[] | any = data?.data?.data;
  const meta: Meta | undefined = data?.data?.meta || undefined;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setFilters((prev) => ({
      ...prev,
      page: selected + 1,
    }));
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <h1 className="text-2xl font-semibold mb-8 text-center md:text-left text-gray-900">
        Your Orders
      </h1>
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search orders..."
            value={filters.searchTerm || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                searchTerm: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {/* <span>Filter by Status</span> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: undefined,
                    page: 1,
                  }))
                }
              >
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: "Pending",
                    page: 1,
                  }))
                }
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: "In progress",
                    page: 1,
                  }))
                }
              >
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: "Completed",
                    page: 1,
                  }))
                }
              >
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: "Canceled",
                    page: 1,
                  }))
                }
              >
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => {
              setFilters({});
            }}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>
      <Separator />

      {ordersData?.length === 0 ? (
        // Display a message if no orders are found.
        <div className="flex justify-center items-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-xl text-gray-600 font-medium">No orders found.</p>
        </div>
      ) : (
        // --- Desktop (Medium and Large Screens): Shadcn Table (Manual Rendering) ---
        <div className="w-full mt-6 hidden md:block">
          <div className="rounded-md border shadow-sm">
            <OrderDataTable ordersData={ordersData} isLoading={isLoading} />
          </div>
        </div>
      )}

      {/* Mobile/Tablet (Small Screens): Shadcn Cards */}
      {ordersData?.length > 0 && (
        <div className="block md:hidden">
          <OrderDataMobileView ordersData={ordersData} />
        </div>
      )}

      {/* Pagination Controls for both Desktop and Mobile */}
      {meta && meta.totalPage >= 1 && (
        <PaginationControls
          meta={meta}
          filters={filters}
          setFilters={setFilters}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default OrdersPage;
