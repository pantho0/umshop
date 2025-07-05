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

export interface Product {
  _id: string;
  title: string;
  parentCategory: IParentCategory;
  subCategory: ISubCategory;
  variant_color: string[];
  size: string[];
  details: string;
  price: number;
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

