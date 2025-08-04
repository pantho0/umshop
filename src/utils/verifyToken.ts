import { jwtDecode, JwtPayload } from "jwt-decode";

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode(token);
  } catch (error: any) {
    console.log(error.message || "Something Went Wrong");
    return null;
  }
};
