"use server";

import nexiosInstance from "@/app/config/nexios.config";
import {
  ApiResponse,
  IParentCategory,
  IProductResult,
  ISubCategory,
  Product,
} from "@/interface";

export const getProducts = async (query?: Record<string, unknown>) => {
  const res = await nexiosInstance.get<ApiResponse<Product>>("/products", {
    params: query,
    next: {
      tags: ["products"],
    },
  });
  return res.data;
};

export const addProduct = async (productData: Product) => {
  try {
    const res = await nexiosInstance.post<ApiResponse<Product>>(
      "/products/create-product",
      productData
    );
    return res.data;
  } catch (error: any) {
    throw Error(error);
  }
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

export const getSubCategoriesByParent = async (parentCategoryId: string) => {
  const res = await nexiosInstance.get<ApiResponse<ISubCategory[]>>(
    `/sub-categories/${parentCategoryId}`,
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

export const getProductBySlug = async (productSlug: string) => {
  const res = await nexiosInstance.get<ApiResponse<IProductResult>>(
    `/products/${productSlug}`,
    {
      cache: "no-store",
    }
  );
  return res.data;
};

export const updateProduct = async (productData: IProductResult) => {
  try {
    const res = await nexiosInstance.put<ApiResponse<IProductResult>>(
      `/products/${productData?.slug}`,
      productData
    );
    if (!res.data) {
      throw Error("Error updating product");
    }
    return res.data;
  } catch (error: any) {
    throw Error(error);
  }
};
