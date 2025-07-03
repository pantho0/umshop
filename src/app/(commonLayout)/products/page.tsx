/* eslint-disable @typescript-eslint/no-explicit-any */
// app/products/page.tsx
import React from "react";
import { Metadata } from "next";
import { ProductGridDisplay } from "./_components/ProductGridDisplay";
import { FilterSidebar } from "./_components/FilterSidebar";
import productsData from "@/lib/data/product.json"; // Adjust path if needed
import Link from "next/link";
import { X } from "lucide-react";
// import { Product as ProductType } from "@/components/CategoriesData"; // Re-use ProductType from earlier

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

// Define props for the page component to receive searchParams
interface ProductPageProps {
  searchParams: {
    status?: string;
    categories?: string;
    minPrice?: string;
    maxPrice?: string;
    brands?: string;
    ssdSizes?: string;
    colors?: string;
    sortBy?: string;
  };
}

// This is a Server Component
const ProductListingPage = async ({ searchParams }: ProductPageProps) => {
  // In a real application, you would fetch data from your API here:
  // const res = await fetch('YOUR_BACKEND_API_URL/products?' + new URLSearchParams(searchParams).toString());
  // const allProducts: ProductType[] = await res.json();

  // For this demo, we'll use the local JSON and apply filters/sort manually.
  let allProducts: any[] = productsData;

  // Apply filtering based on searchParams (Server-side filtering)
  if (searchParams.status) {
    const statuses = searchParams.status.split(",");
    // Example: Filter by dummy 'on-sale' status if product price is higher than 1000
    // In a real app, products would have a 'status' field.
    if (statuses.includes("on-sale")) {
      allProducts = allProducts.filter((p) => p.price > 1000);
    }
    // Add logic for other statuses
  }
  if (searchParams.categories) {
    const categories = searchParams.categories.split(",");
    allProducts = allProducts.filter((p) =>
      categories.includes(p.subCategory.toLowerCase().replace(/\s/g, "-"))
    );
  }
  if (searchParams.minPrice) {
    allProducts = allProducts.filter(
      (p) => p.price >= parseFloat(searchParams.minPrice!)
    );
  }
  if (searchParams.maxPrice) {
    allProducts = allProducts.filter(
      (p) => p.price <= parseFloat(searchParams.maxPrice!)
    );
  }
  if (searchParams.brands) {
    const brands = searchParams.brands.split(",");
    // This is a simplified brand filter. In a real app, products would have a 'brand' field.
    allProducts = allProducts.filter((p) => {
      const parentCatSlug = p.parentCategory.toLowerCase().replace(/\s/g, "-");
      const subCatSlug = p.subCategory.toLowerCase().replace(/\s/g, "-");
      return brands.some(
        (brand) =>
          p.title.toLowerCase().includes(brand) ||
          parentCatSlug.includes(brand) ||
          subCatSlug.includes(brand)
      );
    });
  }
  // Add more filters for ssdSizes, colors etc.

  // Apply sorting based on searchParams (Server-side sorting)
  if (searchParams.sortBy) {
    switch (searchParams.sortBy) {
      case "newest":
        allProducts.sort(
          (a, b) =>
            new Date(b.details).getTime() - new Date(a.details).getTime()
        ); // Dummy sort by details length
        break;
      case "price-asc":
        allProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        allProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular": // Default or custom logic
      default:
        allProducts.sort((a, b) => b.price - a.price); // Example: sort by price desc for popular
        break;
    }
  }

  const totalFoundItems = allProducts.length; // Update total count based on filters

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Top Bar: Found items, filters, sort by */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Found {totalFoundItems} items
          </h1>
          {/* Active Filters (for demonstration - these would be dynamic based on searchParams) */}
          <div className="flex items-center space-x-2">
            {searchParams.status?.split(",").map((s) => (
              <span
                key={s}
                className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                <X className="ml-1 h-3 w-3 cursor-pointer" />
              </span>
            ))}
            {searchParams.brands?.split(",").map((b) => (
              <span
                key={b}
                className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {b.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                <X className="ml-1 h-3 w-3 cursor-pointer" />
              </span>
            ))}
            {/* Add more active filters here */}
            {(searchParams.status ||
              searchParams.brands ||
              searchParams.categories ||
              searchParams.minPrice ||
              searchParams.maxPrice) && (
              <Link
                href="/products"
                className="text-purple-600 text-sm hover:underline"
              >
                Clear all
              </Link>
            )}
            {/* Sort by Select (now part of ProductGridDisplay client component) */}
          </div>
        </div>

        {/* Main Content Area: Sidebar and Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (Client Component) */}
          <FilterSidebar />

          {/* Product Grid (Client Component) */}
          <ProductGridDisplay products={allProducts} />
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
