/* eslint-disable no-unused-vars */

import { jwtDecode, JwtPayload } from "jwt-decode";

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode(token);
  } catch (error: any) {
    return error;
  }
};
