"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetProduct } from "@/hooks/product.hooks";
import { ProductSkeleton } from "./_components/ProductSkeleton";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ProductsTable from "./_components/ProductsTable";
import { ProductsMobile } from "./_components/ProductsMobile";

export interface searchParamsObjec {
  parentCategory?: string;
  page?: string;
  limit?: string;
  subCategory?: string;
  sortBy?: string;
  // [key: string]: string | string[] | undefined;
}

interface producPageProps {
  searchParams: Promise<searchParamsObjec>;
}

const ProductsPage = ({ searchParams }: producPageProps) => {
  const actualSearchParams = React.use(searchParams);
  const currentSearchParams = useSearchParams();

  const {
    mutate: handleGetProduct,
    data: productsResponse,
    isPending,
    isError,
    error,
  } = useGetProduct();
  const products = productsResponse?.data?.result;
  const meta = productsResponse?.data?.meta;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set("page", pageNumber.toString());
    return `/admin-dashboard/products?${params.toString()}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    handleGetProduct(actualSearchParams as Record<string, unknown>);
  }, [actualSearchParams, handleGetProduct]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {isPending ? (
        <ProductSkeleton />
      ) : isError ? (
        <div className="text-red-500">
          Error: {error?.message || "Failed to load products."}
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <ProductsTable products={products} />
          </div>
          <div className="md:hidden">
            <ProductsMobile products={products} />
          </div>

          <div>
            {meta && meta.totalPage > 1 && (
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPageUrl(Math.max(1, meta.page - 1))}
                        isActive={meta.page === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: meta.totalPage }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href={createPageUrl(i + 1)}
                          isActive={meta.page === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href={createPageUrl(
                          Math.min(meta.totalPage, meta.page + 1)
                        )}
                        isActive={meta.page === meta.totalPage}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ProductsPage;
