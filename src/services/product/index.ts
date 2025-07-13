"use server";

import nexiosInstance from "@/app/config/nexios.config";
import {
  ApiResponse,
  IParentCategory,
  ISubCategory,
  Product,
} from "@/interface";

export const getProducts = async (query?: Record<string, unknown>) => {
  const res = await nexiosInstance.get<ApiResponse<Product[]>>("/products", {
    params: query,
    next: {
      tags: ["products"],
    },
  });
  return res.data;
};

export const getParentCategories = async () => {
  const res = await nexiosInstance.get<ApiResponse<IParentCategory[]>>(
    "/parent-categories",
    {
      next: {
        tags: ["parentcategory"],
      },
    }
  );
  return res.data;
};

export const getSubCategories = async () => {
  const res = await nexiosInstance.get<ApiResponse<ISubCategory[]>>(
    "/sub-categories",
    {
      next: {
        tags: ["subcategory"],
      },
    }
  );
  return res.data;
};

export const uploadSingleImage = async (image: string) => {
  const res = await fetch(`http://localhost:5000/api/v1/cloudinary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });
  return res.json();
};
