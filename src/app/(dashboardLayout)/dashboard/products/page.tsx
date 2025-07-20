"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProduct } from "@/hooks/product.hooks";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

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
    return `/dashboard/products?${params.toString()}`;
  };

  useEffect(() => {
    handleGetProduct(actualSearchParams as Record<string, unknown>);
  }, [actualSearchParams, handleGetProduct]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">
          Error: {error?.message || "Failed to load products."}
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products && products.length > 0 ? (
                products.map((product: any) => {
                  const totalStock = product.variants?.reduce(
                    (acc: number, variant: any) => acc + (variant.stock || 0),
                    0
                  );
                  return (
                    <TableRow key={product._id}>
                      <TableCell>
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{totalStock}</TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Link href={`/products/${product.slug}`}>
                          <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="text-green-600" />
                          </Button>
                        </Link>
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="text-blue-600" />
                        </Button>
                        <Button
                          className="cursor-pointer"
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

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
