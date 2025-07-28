/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "./utils/verifyToken";
import { cookies } from "next/headers";

const authRoutes = ["/login", "/register", "/forget-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  let decodedToken = null;

  decodedToken = verifyToken(accessToken) as any;

  const role = decodedToken.role;

  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }

  if (role === "user" && pathname.match(/^\/user-dashboard/)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin-dashboard/:page*",
    "/user-dashboard/:page*",
  ],
};
