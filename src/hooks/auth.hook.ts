import {
  createUser,
  loginUser,
  upDatePassword,
} from "./../services/auth/index";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (credentials: FieldValues) =>
      await loginUser(credentials),
    onSuccess: () => {
      toast.success("Login Success");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationKey: ["USER_UPDATE_PASSWORD"],
    mutationFn: async (updatedCredentials: FieldValues) =>
      await upDatePassword(updatedCredentials),
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (userData: FieldValues) => await createUser(userData),
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
