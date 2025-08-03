import {
  cancelOrder,
  getMyOrders,
  statusChanging,
} from "./../services/order/index";
import { IOrder } from "@/interface";
import { confirmOrder, getAllOrders } from "@/services/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useGetAllOrders = (query: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["ALL_ORDERS", query],
    queryFn: async () => await getAllOrders(query),
  });
};

export const useGetMyOrders = (email: string) => {
  return useQuery({
    queryKey: ["GET_MY_ORDERS", email],
    queryFn: async () => await getMyOrders(email),
    enabled: !!email,
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
      queryClient.invalidateQueries({
        queryKey: ["ALL_ORDERS"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CANCEL_ORDER"],
    mutationFn: async (orderId: string) => await cancelOrder(orderId),
    onSuccess: () => {
      toast.success("Order Cancelled Successfully");
      queryClient.invalidateQueries({
        queryKey: ["ALL_ORDERS"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_MY_ORDERS"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
