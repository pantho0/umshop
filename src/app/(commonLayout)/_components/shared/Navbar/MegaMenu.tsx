// components/MegaMenu.tsx

"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { createLink } from "./CategoriesData";
import { IParentCategory, ISubCategory } from "@/interface";
import Link from "next/link";

interface MegaMenuCategory extends IParentCategory {
  subCategories: ISubCategory[];
  icon?: string;
}
interface PromoData {
  title: string;
  product: string;
  image: string;
  buttonText: string;
}

const dummyPromoData: { [key: string]: PromoData } = {
  "computers-and-accessories": {
    title: "Deal of the week",
    product: "iMac Pro M1",
    image: "https://placehold.co/200x150/E0E0E0/333333?text=iMac+Pro+M1",
    buttonText: "Shop now",
  },
  "smartphones-and-tablets": {
    title: "New Arrivals",
    product: "Samsung Galaxy Tab S9",
    image: "https://placehold.co/200x150/C0C0C0/333333?text=Galaxy+Tab+S9",
    buttonText: "Discover",
  },
  "tv-video-and-audio": {
    title: "Limited Offer",
    product: 'Sony Bravia 65" OLED',
    image: "https://placehold.co/200x150/A0A0A0/333333?text=Sony+Bravia",
    buttonText: "View Deal",
  },
  headphones: {
    title: "Immersive Sound",
    product: "Sony WH-1000XM5",
    image: "https://placehold.co/200x150/505050/333333?text=Sony+Headphones",
    buttonText: "Discover",
  },
};

const MegaMenu: React.FC = () => {
  const [categories, setCategories] = useState<MegaMenuCategory[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    null
  );
  const [isContentFlashing, setIsContentFlashing] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeMobileCategorySlug, setActiveMobileCategorySlug] = useState<
    string | null
  >(null);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState<boolean>(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await createLink();
        if (response && response.categories) {
          setCategories(response.categories);
          if (response.categories.length > 0) {
            setActiveCategorySlug(response.categories[0].slug);
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories for MegaMenu:", error);
      }
    };
    fetchCategories();
  }, []);

  const getLucideIcon = (iconName?: string): any | null => {
    if (!iconName) return null;
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    if (typeof IconComponent === "function") {
      return IconComponent;
    }
    return null;
  };

  const handleCategoryHover = (categorySlug: string): void => {
    if (activeCategorySlug !== categorySlug) {
      setIsContentFlashing(true);
      setTimeout(() => {
        setActiveCategorySlug(categorySlug);
        setIsContentFlashing(false);
      }, 150);
    }
  };

  const handleMobileCategoryClick = (categorySlug: string): void => {
    setActiveMobileCategorySlug(
      activeMobileCategorySlug === categorySlug ? null : categorySlug
    );
  };

  const currentActiveCategory: MegaMenuCategory | undefined = categories.find(
    (cat) => cat.slug === activeCategorySlug
  );
  const currentActiveMobileCategory: MegaMenuCategory | undefined =
    categories.find((cat) => cat.slug === activeMobileCategorySlug);

  const currentPromo = currentActiveCategory
    ? dummyPromoData[currentActiveCategory.slug]
    : null;
  const currentMobilePromo = currentActiveMobileCategory
    ? dummyPromoData[currentActiveMobileCategory.slug]
    : null;

  return (
    <>
      {/* Desktop Mega Menu */}
      <div className="hidden md:block">
        <DropdownMenu
          open={isDesktopMenuOpen}
          onOpenChange={setIsDesktopMenuOpen}
        >
          {" "}
          {/* Control open state */}
          <DropdownMenuTrigger asChild>
            <button className="flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-md shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 text-white">
              <Menu className="mr-2 h-5 w-5" />
              Categories
              <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute top-full mt-2 w-[800px] h-[450px] bg-white rounded-lg shadow-xl overflow-hidden flex transform-gpu transition-all duration-300 ease-out data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
            sideOffset={5}
            align="start"
          >
            {/* Left Panel: Categories */}
            <div className="w-1/3 bg-gray-50 p-2 border-r border-gray-200 overflow-y-auto">
              {categories.length === 0 ? (
                <div className="p-3 text-gray-500">Loading categories...</div>
              ) : (
                categories.map((category: MegaMenuCategory) => {
                  const Icon = getLucideIcon(category.icon || "Laptop");
                  return (
                    <DropdownMenuItem
                      key={category._id.toString()}
                      onMouseEnter={() => handleCategoryHover(category.slug)}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 ease-in-out ${
                        activeCategorySlug === category.slug
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      } focus:outline-none focus:bg-purple-100`}
                    >
                      <div className="flex items-center">
                        {Icon && <Icon className="mr-3 h-5 w-5" />}
                        <span>{category.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </DropdownMenuItem>
                  );
                })
              )}
            </div>

            {/* Right Panel: Sub-items and Promo */}
            <div
              className={`w-2/3 p-6 bg-white flex flex-col overflow-y-auto transition-opacity duration-150 ease-in-out ${
                isContentFlashing ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentActiveCategory ? (
                <div className="flex-grow grid grid-cols-2 gap-x-8 gap-y-4">
                  {/* Sub-items Section */}
                  <div className="col-span-1">
                    <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                      {currentActiveCategory.name}
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {currentActiveCategory.subCategories.length > 0 ? (
                        currentActiveCategory.subCategories.map(
                          (subItem: ISubCategory) => (
                            <li key={subItem._id.toString()}>
                              <Link
                                href={`/products?subCategory=${subItem.slug}`}
                                className="hover:text-purple-600 transition-colors duration-150"
                                onClick={() => setIsDesktopMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          )
                        )
                      ) : (
                        <li>No subcategories available.</li>
                      )}
                    </ul>
                  </div>

                  {/* Promo Section */}
                  <div className="col-span-1 flex flex-col items-center justify-center bg-purple-50 rounded-lg p-4 shadow-inner">
                    {currentPromo ? (
                      <div className="text-center">
                        <p className="text-sm font-semibold text-purple-700 mb-1">
                          {currentPromo.title}
                        </p>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {currentPromo.product}
                        </h4>
                        <img
                          src={currentPromo.image}
                          alt={currentPromo.product}
                          className="w-40 h-auto mx-auto mb-4 rounded-md shadow-md"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/200x150/E0E0E0/333333?text=Image+Error`;
                          }}
                        />
                        <button className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-md">
                          {currentPromo.buttonText}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        No special offers for this category.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a category to see details.
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Mega Menu (Sheet) */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 text-white">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full sm:max-w-sm bg-white text-gray-800 flex flex-col"
          >
            <SheetHeader className="p-4 border-b border-gray-200">
              <SheetTitle className="text-2xl font-bold text-gray-900">
                Categories
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-500">
                Explore our product range
              </SheetDescription>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto p-4">
              {categories.length === 0 ? (
                <div className="p-3 text-gray-500">Loading categories...</div>
              ) : (
                categories.map((category: MegaMenuCategory) => {
                  const Icon = getLucideIcon(category.icon || "Laptop");
                  const isActive = activeMobileCategorySlug === category.slug;
                  return (
                    <div key={category._id.toString()} className="mb-2">
                      <button
                        onClick={() => handleMobileCategoryClick(category.slug)}
                        className={`flex items-center justify-between w-full p-3 rounded-md transition-colors duration-150 ease-in-out ${
                          isActive
                            ? "bg-purple-100 text-purple-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          {Icon && <Icon className="mr-3 h-5 w-5" />}
                          <span>{category.name}</span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 text-gray-400 transform transition-transform duration-200 ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {isActive && (
                        <div className="pl-8 pt-2 pb-4 bg-gray-50 rounded-b-md border-t border-gray-100">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {category.name} Subcategories
                          </h3>
                          <ul className="space-y-0.5 text-sm text-gray-600">
                            {category.subCategories.length > 0 ? (
                              category.subCategories.map(
                                (subItem: ISubCategory) => (
                                  <li key={subItem._id.toString()}>
                                    <Link
                                      onClick={() =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                      } // Close sheet on subcategory click
                                      href={`/products?subCategory=${subItem.slug}`}
                                      className="hover:text-purple-600 transition-colors duration-150"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                )
                              )
                            ) : (
                              <li>No subcategories available.</li>
                            )}
                          </ul>
                          {currentMobilePromo ? (
                            <div className="flex flex-col items-center justify-center bg-purple-50 rounded-lg p-3 mt-4 shadow-inner">
                              <div className="text-center">
                                <p className="text-xs font-semibold text-purple-700 mb-1">
                                  {currentMobilePromo.title}
                                </p>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">
                                  {currentMobilePromo.product}
                                </h4>
                                <img
                                  src={currentMobilePromo.image}
                                  alt={currentMobilePromo.product}
                                  className="w-32 h-auto mx-auto mb-3 rounded-md shadow-md"
                                  onError={(
                                    e: React.SyntheticEvent<
                                      HTMLImageElement,
                                      Event
                                    >
                                  ) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `https://placehold.co/150x100/E0E0E0/333333?text=Image+Error`;
                                  }}
                                />
                                <button className="px-4 py-1.5 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-md">
                                  {currentMobilePromo.buttonText}
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex flex-col space-y-2">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Best Sellers
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Today&apos;s Deals
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                New Arrivals
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Gift Cards
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Help Center
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MegaMenu;
