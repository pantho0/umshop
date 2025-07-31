"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
) {
  (await cookies()).set("accessToken", accessToken, { path: "/" });
  (await cookies()).set("refreshToken", refreshToken, { path: "/" });
}

export async function clearAuthCookies() {
  (await cookies()).set("accessToken", "", { expires: new Date(0), path: "/" });
  (await cookies()).set("refreshToken", "", {
    expires: new Date(0),
    path: "/",
  });
}
