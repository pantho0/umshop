"use server";

import nexiosInstance from "@/app/config/nexios.config";
import { ApiResponse, IParentCategory, ISubCategory, Product } from "@/interface";

export const getProducts = async (query?: Record<string, unknown>) => {
  const res = await nexiosInstance.get<ApiResponse<Product[]>>("/products", {
    params: query,
  });
  return res.data;
};

export const getParentCategories = async () => {
  const res = await nexiosInstance.get<ApiResponse<IParentCategory[]>>(
    "/parent-categories"
  );
  return res.data;
};

export const getSubCategories = async () => {
  const res = await nexiosInstance.get<ApiResponse<ISubCategory[]>>(
    "/sub-categories"
  );
  return res.data;
};

