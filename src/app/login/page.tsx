/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Logo from "../../../public/assets/umshop.jpg";
import Link from "next/link";
import Lottie from "lottie-react";
import loginanime from "../../../public/assets/login-animation.json";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLogin } from "@/hooks/auth.hook";

import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    mutate: handleLogin,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLogin();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoginError(null); // Clear previous errors
    handleLogin(data);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!isPending && isSuccess) {
      const user = verifyToken(data?.data?.accessToken);
      if (!user) {
        setLoginError("Incorrect email or password");
        return;
      }
      dispatch(setUser({ user: user, token: data?.data?.accessToken }));

      if (params.get("redirect")) {
        console.log(params.get("redirect"));
        router.push(params.get("redirect") as any);
      } else {
        router.push("/");
      }
    } else if (isError) {
      setLoginError(error?.message || "An unexpected error occurred.");
    }
  }, [isPending, isSuccess, isError, error]);

  return (
    <div className="font-inter antialiased min-h-screen flex items-center justify-center p-4">
      <div className=" rounded-lg flex flex-col lg:flex-row w-full md:items-center max-w-4xl overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="Cartzilla Logo"
                    className="h-13 w-40 mb-4 cursor-pointer"
                  />
                </Link>
              </div>
              <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 text-center text-sm">
                Do not have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <UMForm onSubmit={onSubmit}>
              <div className="space-y-2 mb-4">
                <div className="space-y-1">
                  <UMInput
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    label="Email"
                  />
                </div>
                <div className="space-y-1">
                  <UMInput
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    label="Password"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) =>
                      setRememberMe(checked)
                    }
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-gray-700 cursor-pointer"
                  >
                    Remember for 30 days
                  </label>
                </div>
                <Link
                  href="/forget-password"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              {loginError && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {loginError}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-red-500 text-white cursor-pointer py-2.5 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                Sign in
              </Button>
            </UMForm>

            <div className="flex  my-6">
              <Separator className=" w-1/2 bg-gray-200" />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="flex items-center border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="h-5 w-5 mr-2"
                />
                Google
              </Button>
              <Button
                variant="outline"
                className="flex items-center border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="h-5 w-5 mr-2"
                />
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p className="mb-2">
              Need help?{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Contact us
              </a>
            </p>
            <p>© All rights reserved. Made by Createx Studio</p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden lg:block lg:w-1/2relative">
          <Lottie animationData={loginanime} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
