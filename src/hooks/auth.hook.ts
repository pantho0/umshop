import { loginUser } from "./../services/auth/index";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (credentials: FieldValues) =>
      await loginUser(credentials),
    onSuccess: (data) => {
      toast.success("Login Success");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
