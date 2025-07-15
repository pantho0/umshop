/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IParentCategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface ISubCategory {
  _id: string;
  name: string;
  parentCategory: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface Variant {
  sku: string;
  color: string;
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  _id: string;
  title: string;
  parentCategory: IParentCategory;
  subCategory: ISubCategory;
  variants: Variant[];
  details: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface FilterSidebarProps {
  filterOptions: any;
  onFilterChange: () => void;
  currentSearchParams: {
    parent_category?: string;
    sub_category?: string;
    [key: string]: string | string[] | undefined;
  };
}

export interface ProductGridDisplayProps {
  products: Product[];
  currentSortBy: string;
  isLoading: boolean;
}

export interface ProductListWrapperProps {
  filterOptions: any;
  products: Product[];
  currentSearchParams: {
    parent_category?: string;
    sub_category?: string;
    sortBy?: string;
    [key: string]: string | string[] | undefined;
  };
}

export type TOrder = {
  orderId: string;
  orderDate: string;
  status: "In progress" | "Delivered" | "Canceled";
  total: number;
  items: {
    name: string;
    image: string;
  }[];
};

export interface LoginSuccessResponse {
  success: boolean;
  message: string;
  data: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface IOrder {
  fullName: string;
  mobileNumber: string;
  email: string;
  district: string;
  upazilla: string;
  detailsInformation: string;
  paymentMethod: string;
  status: "Pending" | "In progress" | "Delivered" | "Canceled";
  orderedItems: IOrderedItem[];
  grandTotal: number;
}

export interface IOrderedItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  image: string;
  color: string;
  model: string;
  quantity: number;
}
