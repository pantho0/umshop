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

  const [selectedParentCats, setSelectedParentCats] = useState<string[]>(
    currentSearchParams.parent_category?.split(",") || []
  );
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>(
    currentSearchParams.sub_category?.split(",") || []
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setSelectedParentCats(
      currentSearchParams.parent_category?.split(",") || []
    );
    setSelectedSubCats(currentSearchParams.sub_category?.split(",") || []);
  }, [currentSearchParams]);

  const updateUrlParams = (newParentCats: string[], newSubCats: string[]) => {
    onFilterChange();
    const params = new URLSearchParams(searchParams.toString());

    if (newParentCats.length > 0) {
      params.set("parent_category", newParentCats.join(","));
    } else {
      params.delete("parent_category");
    }

    if (newSubCats.length > 0) {
      params.set("sub_category", newSubCats.join(","));
    } else {
      params.delete("sub_category");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleParentCatCheckboxChange = (
    parentCat: any,
    isChecked: boolean
  ) => {
    let newParentCats: string[];
    const subSlugsInThisParent = parentCat.subCategories.map(
      (sc: any) => sc.slug
    );
    let newSubCats = [...selectedSubCats];

    if (isChecked) {
      newParentCats = [...selectedParentCats, parentCat.slug];

      newSubCats = [...new Set([...newSubCats, ...subSlugsInThisParent])];
    } else {
      newParentCats = selectedParentCats.filter((p) => p !== parentCat.slug);

      newSubCats = newSubCats.filter(
        (sc) => !subSlugsInThisParent.includes(sc)
      );
    }

    setSelectedParentCats(newParentCats);
    setSelectedSubCats(newSubCats);

    updateUrlParams(newParentCats, newSubCats);
  };

  const handleSubCatCheckboxChange = (
    parentCat: any,
    subSlug: string,
    isChecked: boolean
  ) => {
    let newSubCats: string[];
    if (isChecked) {
      newSubCats = [...selectedSubCats, subSlug];
    } else {
      newSubCats = selectedSubCats.filter((s) => s !== subSlug);
    }

    const allSubSlugsInParent = parentCat.subCategories.map(
      (sc: any) => sc.slug
    );
    const currentlySelectedSubSlugsInParent = newSubCats.filter((sc: any) =>
      allSubSlugsInParent.includes(sc)
    );

    let newParentCats = [...selectedParentCats];
    if (
      currentlySelectedSubSlugsInParent.length === allSubSlugsInParent.length &&
      allSubSlugsInParent.length > 0
    ) {
      if (!newParentCats.includes(parentCat.slug)) {
        newParentCats.push(parentCat.slug);
      }
    } else {
      newParentCats = newParentCats.filter((p) => p !== parentCat.slug);
    }

    setSelectedSubCats(newSubCats);
    setSelectedParentCats(newParentCats);

    updateUrlParams(newParentCats, newSubCats);
  };

  const renderCategoriesFilter = () => (
    <AccordionItem value="categories" className="border-b border-gray-200">
      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
        Categories
      </AccordionTrigger>
      <AccordionContent className="pt-2">
        {/* Nested Accordion for Parent Categories */}
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={filterOptions.categories
            .filter(
              (pc: any) =>
                selectedParentCats.includes(pc.slug) ||
                pc.subCategories.some((sub: any) =>
                  selectedSubCats.includes(sub.slug)
                )
            )
            .map((pc: any) => pc.slug)}
        >
          {filterOptions.categories.map((parentCat: any) => (
            <AccordionItem
              key={parentCat.slug}
              value={parentCat.slug}
              className="border-b border-gray-100"
            >
              <AccordionTrigger
                className="text-base font-medium text-gray-700 hover:no-underline py-2 w-full text-left"
              >
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="flex items-center space-x-2">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleParentCatCheckboxChange(
                          parentCat, 
                          !(selectedParentCats.includes(parentCat.slug) ||
                          (parentCat.subCategories.length > 0 &&
                            parentCat.subCategories.every((sub: any) =>
                              selectedSubCats.includes(sub.slug)
                            )))
                        );
                      }}
                      className="flex items-center space-x-2"
                    >
                      <div 
                        className={`w-4 h-4 rounded border ${selectedParentCats.includes(parentCat.slug) ||
                          (parentCat.subCategories.length > 0 &&
                            parentCat.subCategories.every((sub: any) =>
                              selectedSubCats.includes(sub.slug)
                            )) 
                            ? 'bg-primary border-primary' 
                            : 'border-gray-300'}`}
                      >
                        {(selectedParentCats.includes(parentCat.slug) ||
                          (parentCat.subCategories.length > 0 &&
                            parentCat.subCategories.every((sub: any) =>
                              selectedSubCats.includes(sub.slug)
                            ))) && (
                          <svg
                            className="w-3 h-3 m-0.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{parentCat.name}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {parentCat.count}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-2 pl-6">
                <div className="space-y-2">
                  {parentCat.subCategories.length > 0 ? (
                    parentCat.subCategories.map((subCat: any) => (
                      <div
                        key={subCat.slug}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`sub-${parentCat.slug}-${subCat.slug}`}
                            checked={selectedSubCats.includes(subCat.slug)}
                            onCheckedChange={(checked: boolean) =>
                              handleSubCatCheckboxChange(
                                parentCat,
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
