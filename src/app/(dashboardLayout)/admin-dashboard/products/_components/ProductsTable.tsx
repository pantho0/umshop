"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsTable = ({ products }: { products: any }) => {
  const [mounted, isMounted] = useState(false);
  useEffect(() => {
    isMounted(true);
  }, [products]);
  return (
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
                  <Link href={`/admin-dashboard/products/${product.slug}`}>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="text-blue-600" />
                    </Button>
                  </Link>
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
  );
};

export default ProductsTable;
