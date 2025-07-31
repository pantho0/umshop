import { Nexios } from "nexios-http";

import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
});

async function getCookieData() {
  const cookieData = (await cookies()).get("accessToken")?.value;
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}

nexiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getCookieData();
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: accessToken as string,
    };
  }
  return config;
});

export default nexiosInstance;
