"use client";
import React, { useState, useEffect } from "react";
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
import { Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // Import Next.js navigation hooks

export const FilterSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get current URL search params

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initialize filter states from URL search params
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    searchParams.get("status")?.split(",") || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );
  const [minPrice, setMinPrice] = useState<number | "">(
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : ""
  );
  const [maxPrice, setMaxPrice] = useState<number | "">(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : ""
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brands")?.split(",") || []
  );
  const [selectedSsdSizes, setSelectedSsdSizes] = useState<string[]>(
    searchParams.get("ssdSizes")?.split(",") || []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get("colors")?.split(",") || []
  );

  // Sync state with URL changes (e.g., if user navigates back/forward)
  useEffect(() => {
    setSelectedStatus(searchParams.get("status")?.split(",") || []);
    setSelectedCategories(searchParams.get("categories")?.split(",") || []);
    setMinPrice(
      searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : ""
    );
    setMaxPrice(
      searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : ""
    );
    setSelectedBrands(searchParams.get("brands")?.split(",") || []);
    setSelectedSsdSizes(searchParams.get("ssdSizes")?.split(",") || []);
    setSelectedColors(searchParams.get("colors")?.split(",") || []);
  }, [searchParams]);

  // Simulate filter data for sidebar (these would ideally come from an API)
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

  // Function to update URL search params
  const updateSearchParams = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`?${params.toString()}`, { scroll: false }); // Update URL without scrolling
  };

  const handleCheckboxChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    paramKey: string
  ) => {
    let newList: string[];
    if (list.includes(value)) {
      newList = list.filter((item) => item !== value);
    } else {
      newList = [...list, value];
    }
    setList(newList);
    updateSearchParams(paramKey, newList);
  };

  const handlePriceApply = () => {
    updateSearchParams("minPrice", minPrice.toString());
    updateSearchParams("maxPrice", maxPrice.toString());
  };

  const renderFilterSection = (
    title: string,
    value: string,
    options: { label: string; count?: number; value: string; hex?: string }[],
    selectedList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    paramKey: string,
    isPrice?: boolean,
    isColor?: boolean,
    showAllButton?: boolean
  ) => (
    <AccordionItem value={value} className="border-b border-gray-200">
      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pt-2">
        {isPrice ? (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-1/2"
            />
            <Button
              onClick={handlePriceApply}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
            >
              Apply
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${paramKey}-${option.value}`}
                    checked={selectedList.includes(option.value)}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        selectedList,
                        setList,
                        option.value,
                        paramKey
                      )
                    }
                  />
                  <label
                    htmlFor={`${paramKey}-${option.value}`}
                    className="text-sm text-gray-700 cursor-pointer flex items-center"
                  >
                    {isColor && option.hex && (
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                        style={{ backgroundColor: option.hex }}
                      ></span>
                    )}
                    {option.label}
                  </label>
                </div>
                {option.count !== undefined && (
                  <span className="text-xs text-gray-500">{option.count}</span>
                )}
              </div>
            ))}
            {showAllButton && (
              <Button
                variant="link"
                className="text-sm text-purple-600 p-0 h-auto"
              >
                Show all
              </Button>
            )}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden mb-4">
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
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
                  {renderFilterSection(
                    "Status",
                    "status",
                    statusOptions,
                    selectedStatus,
                    setSelectedStatus,
                    "status"
                  )}
                  {renderFilterSection(
                    "Categories",
                    "categories",
                    categoryOptions,
                    selectedCategories,
                    setSelectedCategories,
                    "categories"
                  )}
                  {renderFilterSection(
                    "Price",
                    "price",
                    [],
                    [],
                    () => {},
                    "price",
                    true
                  )}{" "}
                  {/* Price filter is special */}
                  {renderFilterSection(
                    "Brand",
                    "brand",
                    brandOptions,
                    selectedBrands,
                    setSelectedBrands,
                    "brands",
                    false,
                    false,
                    true
                  )}
                  {renderFilterSection(
                    "SSD Size",
                    "ssd-size",
                    ssdSizeOptions,
                    selectedSsdSizes,
                    setSelectedSsdSizes,
                    "ssdSizes"
                  )}
                  {renderFilterSection(
                    "Color",
                    "color",
                    colorOptions,
                    selectedColors,
                    setSelectedColors,
                    "colors",
                    false,
                    true
                  )}
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
          {renderFilterSection(
            "Status",
            "status-desktop",
            statusOptions,
            selectedStatus,
            setSelectedStatus,
            "status"
          )}
          {renderFilterSection(
            "Categories",
            "categories-desktop",
            categoryOptions,
            selectedCategories,
            setSelectedCategories,
            "categories"
          )}
          {renderFilterSection(
            "Price",
            "price-desktop",
            [],
            [],
            () => {},
            "price",
            true
          )}
          {renderFilterSection(
            "Brand",
            "brand-desktop",
            brandOptions,
            selectedBrands,
            setSelectedBrands,
            "brands",
            false,
            false,
            true
          )}
          {renderFilterSection(
            "SSD Size",
            "ssd-size-desktop",
            ssdSizeOptions,
            selectedSsdSizes,
            setSelectedSsdSizes,
            "ssdSizes"
          )}
          {renderFilterSection(
            "Color",
            "color-desktop",
            colorOptions,
            selectedColors,
            setSelectedColors,
            "colors",
            false,
            true
          )}
        </Accordion>
      </aside>
    </>
  );
};
