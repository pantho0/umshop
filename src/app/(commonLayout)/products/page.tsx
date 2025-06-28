/* eslint-disable @next/next/no-img-element */
// pages/ProductListingPage.tsx
"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Menu, Star, ShoppingCart, X } from "lucide-react";

// Import existing components
// import DiscountBanner from "../components/DiscountBanner";
import productsData from "../../../../public/product/product.json";

// Helper for star ratings (re-used)
const renderStars = (
  rating: number,
  reviewCount: number,
  size: "sm" | "md" = "md"
) => {
  const stars = [];
  const starSizeClass = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`${starSizeClass} ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return (
    <div className="flex items-center text-sm text-gray-500">
      <div className="flex mr-1">{stars}</div>
      {reviewCount > 0 && <span>({reviewCount})</span>}
    </div>
  );
};

const ProductListingPage: React.FC = () => {
  const products = productsData;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dummy filter states (for demonstration)
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 340, max: 1250 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSsdSizes, setSelectedSsdSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Simulate filter data for sidebar
  const statusOptions = [
    { label: "On Sale", count: 12, value: "on-sale" },
    { label: "Free Delivery", count: 8, value: "free-delivery" },
    { label: "Available to Order", count: 150, value: "available-to-order" },
  ];

  const categoryOptions = [
    { label: "Smartphones", count: 218, value: "smartphones" },
    { label: "Accessories", count: 372, value: "accessories" },
    { label: "Tablets", count: 110, value: "tablets" },
    {
      label: "Wearable Electronics",
      count: 142,
      value: "wearable-electronics",
    },
    { label: "Computers & Laptops", count: 205, value: "computers-laptops" },
    {
      label: "Cameras, Photo & Video",
      count: 78,
      value: "cameras-photo-video",
    },
    { label: "Headphones", count: 121, value: "headphones" },
    { label: "Video Games", count: 80, value: "video-games" },
  ];

  const brandOptions = [
    { label: "Apple", count: 47, value: "apple" },
    { label: "Asus", count: 12, value: "asus" },
    { label: "Dell", count: 52, value: "dell" },
    { label: "HP", count: 20, value: "hp" },
    { label: "Lenovo", count: 112, value: "lenovo" },
    { label: "2E Gaming", count: 19, value: "2e-gaming" },
    { label: "Aulock", count: 35, value: "aulock" },
  ];

  const ssdSizeOptions = [
    { label: "2 TB", count: 13, value: "2tb" },
    { label: "1 TB", count: 28, value: "1tb" },
    { label: "512 GB", count: 36, value: "512gb" },
    { label: "256 GB", count: 59, value: "256gb" },
    { label: "128 GB", count: 69, value: "128gb" },
    { label: "64 GB or less", count: 141, value: "64gb-less" },
  ];

  const colorOptions = [
    { label: "Black", value: "black", hex: "#000000" },
    { label: "Coral red", value: "coral-red", hex: "#FF6F61" },
    { label: "Light grey", value: "light-grey", hex: "#D3D3D3" },
    { label: "Sky blue", value: "sky-blue", hex: "#87CEEB" },
    { label: "White", value: "white", hex: "#FFFFFF" },
  ];

  const handleCheckboxChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Filtered products for display (simplified for demo)
  const displayedProducts = products.filter((product, index) => index < 10); // Show first 10 products

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Top Bar: Found items, filters, sort by */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Found 792 items
          </h1>
          <div className="flex items-center space-x-2">
            {/* Active Filters (for demonstration) */}
            <span className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
              Sale <X className="ml-1 h-3 w-3 cursor-pointer" />
            </span>
            <span className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
              Apple <X className="ml-1 h-3 w-3 cursor-pointer" />
            </span>
            <span className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
              1 TB <X className="ml-1 h-3 w-3 cursor-pointer" />
            </span>
            <Button
              variant="ghost"
              className="text-purple-600 text-sm hover:underline"
            >
              Clear all
            </Button>
            <div className="hidden sm:block">
              {" "}
              {/* Hide on extra small screens */}
              <Select>
                <SelectTrigger className="w-[180px] bg-white rounded-md border border-gray-300">
                  <SelectValue placeholder="Sort by: Most popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content Area: Sidebar and Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden mb-4">
            <Sheet
              open={isMobileSidebarOpen}
              onOpenChange={setIsMobileSidebarOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <Menu className="mr-2 h-5 w-5" /> Filter Products
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:max-w-sm bg-gray-50 flex flex-col"
              >
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
                  {/* Sidebar content goes here (re-use the desktop sidebar structure) */}
                  <aside className="w-full bg-white rounded-lg shadow-md p-4 space-y-6">
                    <Accordion
                      type="multiple"
                      defaultValue={[
                        "status",
                        "categories",
                        "price",
                        "brand",
                        "ssd-size",
                        "color",
                      ]}
                    >
                      {/* Status Filter */}
                      <AccordionItem
                        value="status"
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                          Status
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="space-y-2">
                            {statusOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`status-${option.value}`}
                                    checked={selectedStatus.includes(
                                      option.value
                                    )}
                                    onCheckedChange={() =>
                                      handleCheckboxChange(
                                        selectedStatus,
                                        setSelectedStatus,
                                        option.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`status-${option.value}`}
                                    className="text-sm text-gray-700 cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {option.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Categories Filter */}
                      <AccordionItem
                        value="categories"
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                          Categories
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="space-y-2">
                            {categoryOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`category-${option.value}`}
                                    checked={selectedCategories.includes(
                                      option.value
                                    )}
                                    onCheckedChange={() =>
                                      handleCheckboxChange(
                                        selectedCategories,
                                        setSelectedCategories,
                                        option.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`category-${option.value}`}
                                    className="text-sm text-gray-700 cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {option.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Price Filter */}
                      <AccordionItem
                        value="price"
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                          Price
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              placeholder="Min"
                              value={priceRange.min}
                              onChange={(e) =>
                                setPriceRange({
                                  ...priceRange,
                                  min: Number(e.target.value),
                                })
                              }
                              className="w-1/2"
                            />
                            <span>-</span>
                            <Input
                              type="number"
                              placeholder="Max"
                              value={priceRange.max}
                              onChange={(e) =>
                                setPriceRange({
                                  ...priceRange,
                                  max: Number(e.target.value),
                                })
                              }
                              className="w-1/2"
                            />
                          </div>
                          <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
                            Apply
                          </Button>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Brand Filter */}
                      <AccordionItem
                        value="brand"
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                          Brand
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="space-y-2">
                            {brandOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`brand-${option.value}`}
                                    checked={selectedBrands.includes(
                                      option.value
                                    )}
                                    onCheckedChange={() =>
                                      handleCheckboxChange(
                                        selectedBrands,
                                        setSelectedBrands,
                                        option.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`brand-${option.value}`}
                                    className="text-sm text-gray-700 cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {option.count}
                                </span>
                              </div>
                            ))}
                            <Button
                              variant="link"
                              className="text-sm text-purple-600 p-0 h-auto"
                            >
                              Show all
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* SSD Size Filter */}
                      <AccordionItem
                        value="ssd-size"
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                          SSD Size
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="space-y-2">
                            {ssdSizeOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`ssd-size-${option.value}`}
                                    checked={selectedSsdSizes.includes(
                                      option.value
                                    )}
                                    onCheckedChange={() =>
                                      handleCheckboxChange(
                                        selectedSsdSizes,
                                        setSelectedSsdSizes,
                                        option.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`ssd-size-${option.value}`}
                                    className="text-sm text-gray-700 cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {option.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Color Filter */}
                      <AccordionItem
                        value="color"
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                          Color
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="space-y-2">
                            {colorOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`color-${option.value}`}
                                    checked={selectedColors.includes(
                                      option.value
                                    )}
                                    onCheckedChange={() =>
                                      handleCheckboxChange(
                                        selectedColors,
                                        setSelectedColors,
                                        option.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`color-${option.value}`}
                                    className="text-sm text-gray-700 cursor-pointer flex items-center"
                                  >
                                    <span
                                      className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                                      style={{ backgroundColor: option.hex }}
                                    ></span>
                                    {option.label}
                                  </label>
                                </div>
                                {/* No count for color in the image */}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </aside>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 bg-white rounded-lg shadow-md p-4 space-y-6 flex-shrink-0">
            <Accordion
              type="multiple"
              defaultValue={[
                "status",
                "categories",
                "price",
                "brand",
                "ssd-size",
                "color",
              ]}
            >
              {/* Status Filter */}
              <AccordionItem
                value="status"
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  Status
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${option.value}-desktop`}
                            checked={selectedStatus.includes(option.value)}
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                selectedStatus,
                                setSelectedStatus,
                                option.value
                              )
                            }
                          />
                          <label
                            htmlFor={`status-${option.value}-desktop`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Categories Filter */}
              <AccordionItem
                value="categories"
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  Categories
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {categoryOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${option.value}-desktop`}
                            checked={selectedCategories.includes(option.value)}
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                selectedCategories,
                                setSelectedCategories,
                                option.value
                              )
                            }
                          />
                          <label
                            htmlFor={`category-${option.value}-desktop`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Price Filter */}
              <AccordionItem value="price" className="border-b border-gray-200">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  Price
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="w-1/2"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="w-1/2"
                    />
                  </div>
                  <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
                    Apply
                  </Button>
                </AccordionContent>
              </AccordionItem>

              {/* Brand Filter */}
              <AccordionItem value="brand" className="border-b border-gray-200">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  Brand
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {brandOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${option.value}-desktop`}
                            checked={selectedBrands.includes(option.value)}
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                selectedBrands,
                                setSelectedBrands,
                                option.value
                              )
                            }
                          />
                          <label
                            htmlFor={`brand-${option.value}-desktop`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      </div>
                    ))}
                    <Button
                      variant="link"
                      className="text-sm text-purple-600 p-0 h-auto"
                    >
                      Show all
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* SSD Size Filter */}
              <AccordionItem
                value="ssd-size"
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  SSD Size
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {ssdSizeOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`ssd-size-${option.value}-desktop`}
                            checked={selectedSsdSizes.includes(option.value)}
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                selectedSsdSizes,
                                setSelectedSsdSizes,
                                option.value
                              )
                            }
                          />
                          <label
                            htmlFor={`ssd-size-${option.value}-desktop`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Color Filter */}
              <AccordionItem value="color" className="border-b border-gray-200">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  Color
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {colorOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${option.value}-desktop`}
                            checked={selectedColors.includes(option.value)}
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                selectedColors,
                                setSelectedColors,
                                option.value
                              )
                            }
                          />
                          <label
                            htmlFor={`color-${option.value}-desktop`}
                            className="text-sm text-gray-700 cursor-pointer flex items-center"
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                              style={{ backgroundColor: option.hex }}
                            ></span>
                            {option.label}
                          </label>
                        </div>
                        {/* No count for color in the image */}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>

          {/* Product Grid */}
          <section className="flex-grow">
            <h2 className="sr-only">Product Listings</h2>{" "}
            {/* SEO friendly hidden heading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {displayedProducts.map((product, index) => {
                const oldPrice = (product.price * 1.2).toFixed(2); // Simulate 20% higher old price
                const randomRating = Math.floor(Math.random() * 3) + 3; // Random 3-5 stars
                const randomReviewCount = Math.floor(Math.random() * 200) + 10; // Random 10-209 reviews

                // Simulate badges (for demo purposes)
                const hasDiscount = index === 0;
                const isNew = index === 3;

                return (
                  <div
                    key={product.title + index} // Use title + index for a more unique key if titles can repeat
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] relative group"
                  >
                    {/* Badges */}
                    {hasDiscount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        -21%
                      </span>
                    )}
                    {isNew && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        New
                      </span>
                    )}

                    {/* Product Image */}
                    <div className="relative w-full h-36  flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          product.images[0] ||
                          `https://placehold.co/150x150/E0E0E0/333333?text=Product+${index}`
                        }
                        alt={product.title}
                        className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://placehold.co/150x150/E0E0E0/333333?text=Image+Error`;
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      {renderStars(randomRating, randomReviewCount)}
                      <h3 className="text-sm font-semibold text-gray-800 mt-2 mb-2 leading-tight">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline space-x-2 mt-auto">
                        <span className="text-sm font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${oldPrice}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="p-4 border-t border-gray-100 flex justify-end">
                      <button className="p-1 bg-gray-100 rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700 transition-colors duration-200 shadow-sm">
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* Integrate DiscountBanner after a few products for visual effect */}
              {/* {displayedProducts.length > 4 && (
                <div className="col-span-full mt-8 mb-4">
                  <DiscountBanner />
                </div>
              )} */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
