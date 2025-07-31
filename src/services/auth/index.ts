"use server";
import nexiosInstance from "@/app/config/nexios.config";
import {
  ApiResponse,
  IUpdatePassRes,
  IUser,
  LoginSuccessResponse,
} from "@/interface";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (credentials: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post<
      ApiResponse<LoginSuccessResponse | any>
    >("/auth/login", credentials);
    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }
    (await cookies()).set("accessToken", data.data.accessToken);
    (await cookies()).set("refreshToken", data.data.refreshToken);
    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during login"
    );
  }
};

export const upDatePassword = async (updatedCredentials: FieldValues) => {
  try {
    const { data } = await nexiosInstance.put<ApiResponse<IUpdatePassRes>>(
      "/auth/change-password",
      updatedCredentials
    );
    if (!data.success) {
      throw new Error(
        data.errorSources?.[0].messsage || "Password update failed"
      );
    }
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
    return data;
  } catch (error: any) {
    console.error("Password update error:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during password update"
    );
  }
};

export const createUser = async (userData: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post<ApiResponse<any>>(
      "/users/create-user",
      userData
    );
    if (!data.success) {
      throw new Error(
        data.errorSources?.[0].messsage || "User creation failed"
      );
    }
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during user creation"
    );
  }
};

export const getAllUser = async () => {
  try {
    const res = await nexiosInstance.get<ApiResponse<IUser[]>>("/users");
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to fetch users");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch users");
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const res = await nexiosInstance.get<
      ApiResponse<IUser[] | undefined | any>
    >(`/users/${id}`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to fetch users");
    }
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during user creation"
    );
  }
};

export const changeUserRole = async (userRoleinfo: {
  id: string;
  role: string;
}) => {
  try {
    const res = await nexiosInstance.put<ApiResponse<IUser[]>>(
      "/users/change-role",
      userRoleinfo
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to update user role");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user role");
  }
};

export const changeIsBlockStatus = async (userBlockInfo: { id: string }) => {
  try {
    const res = await nexiosInstance.put<ApiResponse<IUser>>(
      "/users/block-user",
      userBlockInfo
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to update user block status");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user block status");
  }
};

export const deleteUserStatus = async (userDeleteInfo: { id: string }) => {
  try {
    const res = await nexiosInstance.put<ApiResponse<IUser>>(
      "/users/delete-user",
      userDeleteInfo
    );
    if (!res.data.success) {
      throw new Error(
        res.data.message || "Failed to update user delete status"
      );
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user delete status");
  }
};
export const forgetPassword = async (forgetPassInfo: FieldValues) => {
  try {
    const res = await nexiosInstance.post<ApiResponse<any>>(
      "/auth/forget-password",
      forgetPassInfo
    );
    if (!res.data.success) {
      throw new Error(
        res.data.message || "Failed to create forget password request to server"
      );
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Failed to create forget password request to server"
    );
  }
};

export async function serverLogout() {
  (await cookies()).set("accessToken", "", { expires: new Date(0), path: "/" });
  (await cookies()).set("refreshToken", "", {
    expires: new Date(0),
    path: "/",
  });
}
