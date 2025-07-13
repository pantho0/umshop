import { loginUser } from "./../services/auth/index";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: FieldValues) =>
      await loginUser(credentials),
    onSuccess: () => {
      toast.success("Login Success");
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
};
