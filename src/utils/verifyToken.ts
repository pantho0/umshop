import { jwtDecode, JwtPayload } from "jwt-decode";

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
