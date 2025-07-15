import { statusChanging } from "./../services/order/index";
import { IOrder } from "@/interface";
import { confirmOrder, getAllOrders } from "@/services/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useConfirmOrder = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["CONFIRM_ORDER"],
    mutationFn: async (orderData: IOrder) => await confirmOrder(orderData),
    onSuccess: () => {
      router.push("/payment-success");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["ALL_ORDERS"],
    queryFn: async () => await getAllOrders(),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_STATUS"],
    mutationFn: async (data: { orderId: string; statusOption: string }) => {
      return await statusChanging(data.orderId, data.statusOption);
    },
    onSuccess: () => {
      toast.success("Status Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["ALL_ORDERS"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
