/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import Lottie from "lottie-react";
import registerAnimation from "../../../public/assets/register-animation.json";
import Logo from "../../../public/assets/umshop.jpg";
import Image from "next/image";
import Link from "next/link";
import { useCreateUser } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const { mutate: handleCreateUser, isPending, isSuccess } = useCreateUser();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleCreateUser(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <div className="font-inter antialiased min-h-screen flex items-center justify-center p-4">
      <div className=" flex flex-col lg:flex-row w-full max-w-4xl items-center  overflow-hidden">
        {/* Left Section: Registration Form */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <div className="flex justify-center">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="Cartzilla Logo"
                    className="h-13 w-40 mb-4 cursor-pointer"
                  />
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Create an account
              </h1>
              <p className="text-gray-600 text-center text-sm">
                I already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <UMForm onSubmit={onSubmit}>
              <div className="space-y-2 mb-4">
                <div className="space-y-1">
                  <UMInput
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    label="First Name"
                  />
                </div>
                <div className="space-y-1">
                  <UMInput
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    label="Last Name"
                  />
                </div>
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

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-red-500 text-white py-2.5 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                {isPending ? "Creating account..." : "Create account"}
              </Button>
            </UMForm>

            <div className="flex items-center my-6">
              <Separator className="flex-grow bg-gray-200" />
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
              <Button
                variant="outline"
                className="flex items-center border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                <img
                  src="https://www.apple.com/favicon.ico"
                  alt="Apple"
                  className="h-5 w-5 mr-2"
                />
                Apple
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
            <p>© All rights reserved. Made by BRHEX Solutions</p>
          </div>
        </div>

        {/* Right Section: Account Benefits */}
        <div className="hidden lg:block lg:w-1/2  p-8 md:p-12  flex-col justify-center items-center text-center">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
