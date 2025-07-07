/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Metadata } from "next";
import { getFilterOptions } from "@/lib/product-filters";

import {
  getParentCategories,
  getProducts,
  getSubCategories,
} from "@/services/product";
import { IParentCategory, ISubCategory } from "@/interface";
import { ProductListWrapper } from "./_components/ProductListWrapper";

export const metadata: Metadata = {
  title: "Product Listings - Cartzilla",
  description:
    "Browse our wide range of products at Cartzilla. Find the best deals on electronics, accessories, and more.",
  keywords: [
    "products",
    "electronics",
    "accessories",
    "shop",
    "online store",
    "deals",
  ],
};
interface SearchParamsObject {
  parent_category?: string;
  sub_category?: string;
  sortBy?: string;
  [key: string]: string | string[] | undefined;
}

interface ProductPageProps {
  searchParams: Promise<SearchParamsObject>;
}

const ProductListingPage = async ({
  searchParams: searchParamsPromise,
}: ProductPageProps) => {
  const searchParams = await searchParamsPromise;

  const productsResponse = await getProducts(searchParams);
  const rawProductsData = productsResponse.data;
  const parentCategoriesData = await getParentCategories();
  const subCategoriesData = await getSubCategories();

  const parentCategories: IParentCategory[] = parentCategoriesData.data;
  const subCategories: ISubCategory[] = subCategoriesData.data;

  const filterOptions: any = getFilterOptions(parentCategories, subCategories);

  const filteredProducts = rawProductsData;

  if (searchParams.sortBy) {
    switch (searchParams.sortBy) {
      case "newest":
        filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        break;
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
      default:
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  const totalFoundItems = filteredProducts.length;

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Found {totalFoundItems} items
          </h1>
          {/* <div className="flex items-center space-x-2">
            {searchParams.parent_category?.split(",").map(
              (
                val // Updated key
              ) => (
                <span
                  key={`parentCat-${val}`}
                  className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {val
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                  <X className="ml-1 h-3 w-3 cursor-pointer" />
                </span>
              )
            )}
            {searchParams.sub_category?.split(",").map(
              (
                val // Updated key
              ) => (
                <span
                  key={`subCat-${val}`}
                  className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {val
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                  <X className="ml-1 h-3 w-3 cursor-pointer" />
                </span>
              )
            )}
            {(searchParams.parent_category || searchParams.sub_category) && ( // Updated keys
              <a
                href="/products"
                className="text-purple-600 text-sm hover:underline"
              >
                Clear all
              </a>
            )}
          </div> */}
        </div>

        <ProductListWrapper
          filterOptions={filterOptions}
          products={filteredProducts}
          currentSearchParams={searchParams}
        />
      </main>
    </div>
  );
};

export default ProductListingPage;
