import { Product } from "@/interface";
import { addProduct, getProducts } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: (productData: Product) => addProduct(productData),
    onSuccess: () => {
      toast.success("Product added successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to add product");
    },
  });
};
