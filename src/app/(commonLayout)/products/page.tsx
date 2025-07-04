/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/products/page.tsx
import React from "react";
import { Metadata } from "next";
import { ProductGridDisplay } from "./_components/ProductGridDisplay";
import { FilterSidebar } from "./_components/FilterSidebar";

// Import raw data (simulating API fetches)
import rawProductsData from "@/lib/data/product.json"; // Note: Changed to products.json
import parentCategoriesData from "@/lib/data/parentCategories.json";
import subCategoriesData from "@/lib/data/subCategories.json";
import { getFilterOptions } from "@/lib/product-filters";
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

// Define the type for the searchParams object - using desired URL keys
interface SearchParamsObject {
  parent_category?: string; // Updated key
  sub_category?: string; // Updated key
  sortBy?: string;
  // Other potential search params that might exist but are not used for filtering here:
  [key: string]: string | string[] | undefined;
}

// Define props for the page component, with searchParams as a Promise
interface ProductPageProps {
  searchParams: Promise<SearchParamsObject>;
}

// This is a Server Component
const ProductListingPage = async ({
  searchParams: searchParamsPromise,
}: ProductPageProps) => {
  const searchParams = await searchParamsPromise;

  // --- Simulate API Fetches (In a real app, replace with actual fetch calls) ---
  const allProducts: any[] = rawProductsData.map((p) => ({
    ...p,
    // Map names to _id strings for filtering against product data
    parentCategory: (parentCategoriesData.find(
      (pc) => pc._id === p.parentCategory
    )?._id || "") as string,
    subCategory: (subCategoriesData.find((sc) => sc._id === p.sub_Category)
      ?._id || "") as string,
    createdAt: p.createdAt || new Date().toISOString(), // Ensure createdAt exists for sorting
  })) as any[];


  const parentCategories: any[] = parentCategoriesData as any[];
  const subCategories: any[] = subCategoriesData as any[];
  // --- End Simulate API Fetches ---

  // Get filter options data for the sidebar (processed once on the server)
  const filterOptions: any = getFilterOptions(parentCategories, subCategories);

  // Apply filtering based on searchParams (Server-side filtering)
  const filteredProducts = allProducts.filter((product) => {
    // Categories Filter (Parent and Sub) - Now uses slugs from searchParams
    if (searchParams.parent_category) {
      // Updated key
      const selectedParentSlugs = searchParams.parent_category.split(","); // Updated key
      const productParentCat = parentCategories.find(
        (pc) => pc._id.toString() === product.parentCategory
      );
      if (
        !productParentCat ||
        !selectedParentSlugs.includes(productParentCat.slug)
      )
        return false;
    }
    if (searchParams.sub_category) {
      // Updated key
      const selectedSubSlugs = searchParams.sub_category.split(","); // Updated key
      const productSubCat = subCategories.find(
        (sc) => sc._id.toString() === product.subCategory
      );
      if (!productSubCat || !selectedSubSlugs.includes(productSubCat.slug))
        return false;
    }
    return true; // Product passes all filters
  });

  // Apply sorting based on searchParams (Server-side sorting)
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
        {/* Top Bar: Found items, filters, sort by */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Found {totalFoundItems} items
          </h1>
          {/* Active Filters (now dynamic based on searchParams) */}
          <div className="flex items-center space-x-2">
            {/* Only show active category filters */}
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
            {/* Clear all button only if any category filter is active */}
            {(searchParams.parent_category || searchParams.sub_category) && ( // Updated keys
              <a
                href="/products"
                className="text-purple-600 text-sm hover:underline"
              >
                Clear all
              </a>
            )}
          </div>
        </div>

        {/* Main Content Area: Sidebar and Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (Client Component) */}
          {/* Pass the processed filter options and current search params */}
          <FilterSidebar
            filterOptions={filterOptions}
            currentSearchParams={searchParams}
          />

          {/* Product Grid (Client Component) */}
          <ProductGridDisplay
            products={filteredProducts}
            currentSortBy={searchParams.sortBy || ""}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
