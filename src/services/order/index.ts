"use server";

import nexiosInstance from "@/app/config/nexios.config";
import { IOrder } from "@/interface";

export const confirmOrder = async (orderData: IOrder) => {
  try {
    const res = await nexiosInstance.post("/orders/create-order", orderData);
    return await res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
