/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebarProps } from "@/interface";

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filterOptions,
  currentSearchParams,
  onFilterChange,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [selectedSubCats, setSelectedSubCats] = useState<string[]>(
    typeof currentSearchParams.subCategory === 'string'
      ? currentSearchParams.subCategory.split(",").filter(Boolean)
      : []
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    const newSubCats = typeof currentSearchParams.subCategory === 'string'
      ? currentSearchParams.subCategory.split(",").filter(Boolean)
      : [];
    
    setSelectedSubCats(newSubCats);
  }, [currentSearchParams]);

  const updateUrlParams = (newSubCats: string[]) => {
    onFilterChange();
    const params = new URLSearchParams(searchParams.toString());

    if (newSubCats.length > 0) {
      params.set("subCategory", newSubCats.join(","));
    } else {
      params.delete("subCategory");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSubCatCheckboxChange = (
    subSlug: string,
    isChecked: boolean
  ) => {
    let newSubCats: string[];
    if (isChecked) {
      newSubCats = [...selectedSubCats, subSlug];
    } else {
      newSubCats = selectedSubCats.filter((s) => s !== subSlug);
    }

    setSelectedSubCats(newSubCats);
    updateUrlParams(newSubCats);
  };

  const renderCategoriesFilter = () => (
    <AccordionItem value="categories" className="border-b border-gray-200">
      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
        Categories
      </AccordionTrigger>
      <AccordionContent className="pt-2">
        <div className="space-y-4">
          {filterOptions.categories.map((parentCat: any) => (
            <div key={parentCat.slug} className="space-y-2">
              <h3 className="font-medium text-gray-700">{parentCat.name}</h3>
              <div className="pl-2 space-y-2">
                {parentCat.subCategories.length > 0 ? (
                  parentCat.subCategories.map((subCat: any) => (
                    <div
                      key={`${parentCat.slug}-${subCat.slug}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`sub-${parentCat.slug}-${subCat.slug}`}
                          checked={selectedSubCats.includes(subCat.slug)}
                          onCheckedChange={(checked: boolean) =>
                            handleSubCatCheckboxChange(
                              subCat.slug,
                              checked
                            )
                          }
                        />
                        <label
                          htmlFor={`sub-${parentCat.slug}-${subCat.slug}`}
                          className="text-sm text-gray-600 cursor-pointer"
                        >
                          {subCat.name}
                        </label>
                      </div>
                      <span className="text-xs text-gray-500">
                        {subCat.count}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No subcategories found.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
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
                <Accordion type="multiple" defaultValue={["categories"]}>
                  {renderCategoriesFilter()}
                </Accordion>
              </aside>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-1/4 bg-white rounded-lg shadow-md p-4 space-y-6 flex-shrink-0">
        <Accordion type="multiple" defaultValue={["categories"]}>
          {renderCategoriesFilter()}
        </Accordion>
      </aside>
    </>
  );
};
