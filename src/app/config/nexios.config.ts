import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
});

nexiosInstance.interceptors.request.use(async (config) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: accessToken,
    };
  }
  return config;
});

export default nexiosInstance;
