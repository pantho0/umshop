import { Product } from "@/interface";
import { addProduct, getProducts } from "@/services/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (searchParams: Record<string, unknown>) =>
      await getProducts(searchParams),
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
