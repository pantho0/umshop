"use server";

import nexiosInstance from "@/app/config/nexios.config";
import { ApiResponse, IOrder, IorderCancepApiRes } from "@/interface";

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
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Order confirmation failed"
    );
  }
};

export const getAllOrders = async () => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IOrder>>("/orders", {
      cache: "no-store",
    });
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

export const getMyOrders = async (email: string) => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IOrder>>(
      `/orders/${email}`
    );

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

export const statusChanging = async (orderId: string, statusOption: string) => {
  try {
    const res = await nexiosInstance.put<ApiResponse<IOrder>>(
      "/orders/change-order-status",
      {
        orderId,
        statusOption,
      }
    );

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

export const cancelOrder = async (orderId: string) => {
  try {
    const res = await nexiosInstance.delete<ApiResponse<IorderCancepApiRes>>(
      `/orders/${orderId}`
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error canceling order");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error canceling order"
    );
  }
};
