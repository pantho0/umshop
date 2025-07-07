import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
});

export default nexiosInstance;
