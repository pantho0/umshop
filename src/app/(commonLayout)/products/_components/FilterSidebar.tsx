/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
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

// Define props for FilterSidebar
interface FilterSidebarProps {
  filterOptions: any;
  currentSearchParams: {
    parent_category?: string;
    sub_category?: string;
    [key: string]: string | string[] | undefined;
  };
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filterOptions,
  currentSearchParams,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initialize filter states from currentSearchParams prop
  const [selectedParentCats, setSelectedParentCats] = useState<string[]>(
    currentSearchParams.parent_category?.split(",") || []
  );
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>(
    currentSearchParams.sub_category?.split(",") || []
  );

  // Sync state with URL changes
  useEffect(() => {
    setSelectedParentCats(
      currentSearchParams.parent_category?.split(",") || []
    );
    setSelectedSubCats(currentSearchParams.sub_category?.split(",") || []);
  }, [currentSearchParams]);

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
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // New/Updated: handleParentCatCheckboxChange to manage parent and all its subcategories
  const handleParentCatCheckboxChange = (
    parentCat: any,
    isChecked: boolean
  ) => {
    let newParentCats: string[];
    let newSubCats = [...selectedSubCats];
    const subSlugsInThisParent = parentCat.subCategories.map(
      (sc: any) => sc.slug
    );

    if (isChecked) {
      newParentCats = [...selectedParentCats, parentCat.slug];
      // Add all subcategories of this parent
      newSubCats = [...new Set([...newSubCats, ...subSlugsInThisParent])];
    } else {
      newParentCats = selectedParentCats.filter((p) => p !== parentCat.slug);
      // Remove all subcategories of this parent
      newSubCats = newSubCats.filter(
        (sc) => !subSlugsInThisParent.includes(sc)
      );
    }

    setSelectedParentCats(newParentCats);
    setSelectedSubCats(newSubCats);
    updateSearchParams("parent_category", newParentCats);
    updateSearchParams("sub_category", newSubCats);
  };

  // Updated: handleSubCatCheckboxChange to manage subcategory and sync with parent
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
    setSelectedSubCats(newSubCats);
    updateSearchParams("sub_category", newSubCats);

    // Sync parent checkbox state
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
      // All subcategories are selected, check the parent
      if (!newParentCats.includes(parentCat.slug)) {
        newParentCats.push(parentCat.slug);
      }
    } else {
      // Not all subcategories are selected, uncheck the parent
      newParentCats = newParentCats.filter((p) => p !== parentCat.slug);
    }
    setSelectedParentCats(newParentCats);
    updateSearchParams("parent_category", newParentCats);
  };

  // Helper to render the main categories filter section
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
          // Set defaultValue to open parent categories that have selected subcategories, or all if none selected
          defaultValue={
            selectedParentCats.length > 0
              ? selectedParentCats
              : filterOptions.categories.map((pc: any) => pc.slug)
          }
        >
          {filterOptions.categories.map((parentCat: any) => (
            <AccordionItem
              key={parentCat.slug}
              value={parentCat.slug}
              className="border-b border-gray-100"
            >
              <AccordionTrigger className="text-base font-medium text-gray-700 hover:no-underline py-2">
                <div className="flex items-center justify-between w-full pr-2">
                  {" "}
                  {/* pr-2 to prevent arrow overlap */}
                  {/* Re-added Checkbox for Parent Category Name */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`parent-${parentCat.slug}`}
                      // Determine if parent is checked (either explicitly or if all subs are checked)
                      checked={
                        selectedParentCats.includes(parentCat.slug) ||
                        (parentCat.subCategories.length > 0 &&
                          parentCat.subCategories.every((sub: any) =>
                            selectedSubCats.includes(sub.slug)
                          ))
                      }
                      onCheckedChange={(checked: boolean) =>
                        handleParentCatCheckboxChange(parentCat, checked)
                      }
                      // Stop propagation to prevent accordion from toggling when checkbox is clicked
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor={`parent-${parentCat.slug}`}
                      className="cursor-pointer"
                    >
                      {parentCat.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">
                    {parentCat.count}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-2 pl-6">
                {" "}
                {/* Indent subcategories */}
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
