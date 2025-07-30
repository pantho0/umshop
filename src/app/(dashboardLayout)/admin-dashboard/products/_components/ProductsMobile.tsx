import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsMobile = ({ products }: { products: any }) => {
  const [mounted, isMounted] = useState(false);
  console.log(mounted);
  useEffect(() => {
    isMounted(true);
  }, [products]);
  return (
    <>
      {products && products.length > 0 ? (
        products.map((product: any) => {
          const totalStock = product.variants?.reduce(
            (acc: number, variant: any) => acc + (variant.stock || 0),
            0
          );
          return (
            <div key={product._id} className="border rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
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
                <div className="flex-1">
                  <h3 className="font-bold">{product.title}</h3>
                  <p>Stock: {totalStock}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
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
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">No products found.</div>
      )}
    </>
  );
};
