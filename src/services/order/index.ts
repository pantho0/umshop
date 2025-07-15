"use server";

import nexiosInstance from "@/app/config/nexios.config";
import { ApiResponse, IOrder } from "@/interface";

export const confirmOrder = async (orderData: IOrder) => {
  try {
    const res = await nexiosInstance.post<ApiResponse<any>>(
      "/orders/create-order",
      orderData
    );
    if (!res.data.success) {
      throw new Error(
        res.data.message || "Order confirmation failed due to validation"
      );
    }

    return res.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Order confirmation failed"
    );
  }
};

export const getAllOrders = async () => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IOrder>>("/orders");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching orders");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};
