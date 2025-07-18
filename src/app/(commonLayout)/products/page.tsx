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
import Link from "next/link";
import { X } from "lucide-react";

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
  parentCategory?: string;
  page?: string;
  limit?: string;
  subCategory?: string;
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

  let filteredProducts: any[] = [];
  let filterOptions: any = {};

  try {
    const productsResponse = await getProducts(searchParams);
    const rawProductsData = productsResponse?.data.result || [];

    const [parentCategoriesData, subCategoriesData] = await Promise.all([
      getParentCategories(),
      getSubCategories(),
    ]);

    const parentCategories: IParentCategory[] =
      parentCategoriesData?.data || [];
    const subCategories: ISubCategory[] = subCategoriesData?.data || [];

    filterOptions = getFilterOptions(parentCategories, subCategories);

    filteredProducts = Array.isArray(rawProductsData)
      ? [...rawProductsData]
      : [];

    if (searchParams.sortBy) {
      switch (searchParams.sortBy) {
        case "newest":
          filteredProducts.sort(
            (a, b) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );
          break;
        case "price-asc":
          filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case "price-desc":
          filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case "popular":
        default:
          filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="font-inter antialiased bg-gray-50 min-h-screen">
        <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Error Loading Products
            </h2>
            <p className="text-gray-600">
              We&apos;re having trouble loading the products. Please try again
              later.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const totalFoundItems = filteredProducts.length;

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {totalFoundItems > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                Found {totalFoundItems} items
              </h1>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              {searchParams.parentCategory?.split(",").map((val) => (
                <span
                  key={`parentCat-${val}`}
                  className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {val
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  <X className="ml-1 h-3 w-3 cursor-pointer" />
                </span>
              ))}
              {searchParams.subCategory?.split(",").map((val) => (
                <span
                  key={`subCat-${val}`}
                  className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {val
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  <X className="ml-1 h-3 w-3 cursor-pointer" />
                </span>
              ))}
              {(searchParams.parentCategory || searchParams.subCategory) && (
                <Link
                  href="/products"
                  className="text-purple-600 text-sm hover:underline"
                >
                  Clear all
                </Link>
              )}
            </div>
            <ProductListWrapper
              filterOptions={filterOptions}
              products={filteredProducts}
              currentSearchParams={searchParams}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Products Found
            </h2>
            <p className="text-gray-600">
              We couldn&apos;t find any products matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListingPage;
