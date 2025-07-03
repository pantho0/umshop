"use server";

import { ApiResponse, Product } from "@/interface";
import nexiosInstance from "nexios-http";

export const getProducts = async (query?: Record<string, unknown>) => {
  const res = await nexiosInstance.get<ApiResponse<Product[]>>("/products", {
    params: query,
  });
  return res.data.data;
};
