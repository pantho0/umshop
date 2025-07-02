export interface Product {
  _id: string;
  title: string;
  parentCategory: string;
  subCategory: string;
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
