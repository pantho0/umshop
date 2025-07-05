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
