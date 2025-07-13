"use server";
import nexiosInstance from "@/app/config/nexios.config";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (credentials: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post("/auth/login", credentials);
    if (data.success) {
      (await cookies()).set("accessToken", data.data.accessToken);
      (await cookies()).set("refreshToken", data.data.refreshToken);
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
