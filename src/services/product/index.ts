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
  try {
    const res = await nexiosInstance.get<ApiResponse<Product>>("/products", {
      params: query,
      next: {
        tags: ["products"],
      },
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching products");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const addProduct = async (productData: Product) => {
  try {
    const res = await nexiosInstance.post<ApiResponse<Product>>(
      "/products/create-product",
      productData
    );

    if (!res.data.success) {
      throw Error(res.data.message);
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const getParentCategories = async () => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IParentCategory[]>>(
      "/parent-categories",
      {
        next: {
          tags: ["parentcategory"],
        },
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching parent categories");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const getSubCategories = async () => {
  try {
    const res = await nexiosInstance.get<ApiResponse<ISubCategory[]>>(
      "/sub-categories",
      {
        next: {
          tags: ["subcategory"],
        },
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching sub categories");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const getSubCategoriesByParent = async (parentCategoryId: string) => {
  try {
    const res = await nexiosInstance.get<ApiResponse<ISubCategory[]>>(
      `/sub-categories/${parentCategoryId}`,
      {
        next: {
          tags: ["subcategory"],
        },
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching sub categories");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const uploadSingleImage = async (image: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/cloudinary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });
    return res.json();
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const getProductBySlug = async (productSlug: string) => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IProductResult>>(
      `/products/${productSlug}`,
      {
        cache: "no-store",
      }
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Error fetching product");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Error fetching data"
    );
  }
};

export const updateProduct = async (productData: IProductResult) => {
  try {
    const res = await nexiosInstance.put<ApiResponse<IProductResult>>(
      `/products/${productData?.slug}`,
      productData
    );
    if (!res.data.success) {
      throw Error(res.data.message || "Error updating product");
    }
    return res.data;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message || error.message || "Error updating product"
    );
  }
};

export const searchProduct = async (searchTerm: string) => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IProductResult[] | any>>(
      `/products?searchTerm=${searchTerm}`
    );
    if (!res.data.success) {
      throw Error(res.data.message || "Error searching product");
    }
    return res.data;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message || error.message || "Error search product"
    );
  }
};
