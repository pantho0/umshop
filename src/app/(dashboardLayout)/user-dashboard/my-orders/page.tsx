"use client";

import React, { useState, useEffect } from "react";
import { useGetMyOrders } from "@/hooks/order.hook";
import { IOrder } from "@/interface";
import OrderDataTable from "../../_components/order/OrderDataTable";
import { OrderDataMobileView } from "../../_components/order/OrderDataMobileView";
import { useAppSelector } from "@/redux/hook";
import { selectUser } from "@/redux/features/auth/authSlice";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [query]);
  return matches;
}

const MyOrders = () => {
  const user = useAppSelector(selectUser);
  const email = `${user ? user.email : ""}`;
  const { data: myOrdersData, isPending } = useGetMyOrders(email);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-700 font-medium">
          Loading your orders....
        </p>
      </div>
    );
  }

  const ordersData: IOrder[] | any = myOrdersData?.data;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <h1 className="text-4xl font-extrabold mb-8 text-center md:text-left text-gray-900">
        My Orders
      </h1>

      {ordersData?.length === 0 ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-xl text-gray-600 font-medium">No orders found.</p>
        </div>
      ) : isDesktop ? (
        <div className="w-full">
          <div className="rounded-md border shadow-sm">
            <OrderDataTable ordersData={ordersData} />
          </div>
        </div>
      ) : (
        <OrderDataMobileView ordersData={ordersData} />
      )}
    </div>
  );
};
export default MyOrders;
