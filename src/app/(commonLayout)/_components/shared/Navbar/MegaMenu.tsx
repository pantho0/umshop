/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState } from "react";
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
import { categoriesData, CategoryData } from "./CategoriesData";

const MegaMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categoriesData[0].id
  );
  const [isContentFlashing, setIsContentFlashing] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    string | null
  >(null);

  // Helper function to get Lucide icon component by name
  const getLucideIcon = (iconName: string): any | null => {
    // Type assertion to ensure we are looking for a valid key in LucideIcons
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    // Check if the retrieved component is actually a function (React component)
    if (typeof IconComponent === "function") {
      return IconComponent;
    }
    return null;
  };

  // Function to handle category hover for desktop
  const handleCategoryHover = (categoryId: string): void => {
    if (activeCategory !== categoryId) {
      setIsContentFlashing(true); // Start flash animation
      setTimeout(() => {
        setActiveCategory(categoryId);
        setIsContentFlashing(false); // End flash animation after content updates
      }, 150); // Match this duration with the CSS transition duration
    }
  };

  // Function to handle mobile category click
  const handleMobileCategoryClick = (categoryId: string): void => {
    setActiveMobileCategory(
      activeMobileCategory === categoryId ? null : categoryId
    );
  };

  // Find the currently active category object
  const currentCategory: CategoryData | undefined = categoriesData.find(
    (cat) => cat.id === activeCategory
  );
  const currentMobileCategory: CategoryData | undefined = categoriesData.find(
    (cat) => cat.id === activeMobileCategory
  );

  return (
    <>
      {/* Desktop Mega Menu */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-md shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 text-white">
              <Menu className="mr-2 h-5 w-5" />
              Categories
              <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute top-full  mt-2 w-[800px] h-[450px] bg-white rounded-lg shadow-xl overflow-hidden flex transform-gpu transition-all duration-300 ease-out data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
            sideOffset={5}
            align="start"
          >
            {/* Left Panel: Categories */}
            <div className="w-1/3 bg-gray-50 p-2 border-r border-gray-200 overflow-y-auto">
              {categoriesData.map((category: CategoryData) => {
                const Icon = getLucideIcon(category.icon);
                return (
                  <DropdownMenuItem
                    key={category.id}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 ease-in-out ${
                      activeCategory === category.id
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
              })}
            </div>

            {/* Right Panel: Sub-items and Promo */}
            <div
              className={`w-2/3 p-6 bg-white flex flex-col overflow-y-auto transition-opacity duration-150 ease-in-out ${
                isContentFlashing ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentCategory ? (
                <div className="flex-grow grid grid-cols-2 gap-x-8 gap-y-4">
                  {/* Sub-items Section */}
                  <div className="col-span-1">
                    {currentCategory.subItems.map((section, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                          {section.title}
                        </h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <a
                                href="#"
                                className="hover:text-purple-600 transition-colors duration-150"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Promo Section */}
                  <div className="col-span-1 flex flex-col items-center justify-center bg-purple-50 rounded-lg p-4 shadow-inner">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-purple-700 mb-1">
                        {currentCategory.promo.title}
                      </p>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {currentCategory.promo.product}
                      </h4>
                      <img
                        src={currentCategory.promo.image}
                        alt={currentCategory.promo.product}
                        className="w-40 h-auto mx-auto mb-4 rounded-md shadow-md"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://placehold.co/200x150/E0E0E0/333333?text=Image+Error`;
                        }}
                      />
                      <button className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-md">
                        {currentCategory.promo.buttonText}
                      </button>
                    </div>
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
              {categoriesData.map((category: CategoryData) => {
                const Icon = getLucideIcon(category.icon);
                const isActive = activeMobileCategory === category.id;
                return (
                  <div key={category.id} className="mb-2">
                    <button
                      onClick={() => handleMobileCategoryClick(category.id)}
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
                        {currentMobileCategory?.subItems.map(
                          (section, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {section.title}
                              </h3>
                              <ul className="space-y-0.5 text-sm text-gray-600">
                                {section.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <a
                                      href="#"
                                      className="hover:text-purple-600 transition-colors duration-150"
                                    >
                                      {item}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                        {currentMobileCategory?.promo && (
                          <div className="flex flex-col items-center justify-center bg-purple-50 rounded-lg p-3 mt-4 shadow-inner">
                            <div className="text-center">
                              <p className="text-xs font-semibold text-purple-700 mb-1">
                                {currentMobileCategory.promo.title}
                              </p>
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                {currentMobileCategory.promo.product}
                              </h4>
                              <img
                                src={currentMobileCategory.promo.image}
                                alt={currentMobileCategory.promo.product}
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
                                {currentMobileCategory.promo.buttonText}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MegaMenu;
