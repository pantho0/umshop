import { getProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
