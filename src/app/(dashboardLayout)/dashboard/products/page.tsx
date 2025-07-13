"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetProduct } from "@/hooks/product.hooks";

const ProductsPage = () => {
  const { data, isLoading, isError, error } = useGetProduct();
  const products = data?.data;
  console.log(products);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Error: {error?.message || 'Failed to load products.'}</div>
      ) : (
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
                const totalStock = product.variants?.reduce((acc: number, variant: any) => acc + (variant.stock || 0), 0);
                return (
                  <TableRow key={product._id}>
                    <TableCell>
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs">No Image</div>
                      )}
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{totalStock}</TableCell>
                    <TableCell className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="secondary" size="sm">Update</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default ProductsPage;
