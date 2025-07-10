/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Lottie from "lottie-react";
import registerAnimation from "../../../public/assets/register-animation.json";
import Logo from "../../../public/assets/umshop.jpg";
import Image from "next/image";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [savePassword, setSavePassword] = useState<boolean>(false);
  const [receiveOffers, setReceiveOffers] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempt:", {
      email,
      password,
      confirmPassword,
      savePassword,
      receiveOffers,
    });
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Registration functionality not implemented in this demo.");
  };

  return (
    <div className="font-inter antialiased min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-50 rounded-lg  flex flex-col lg:flex-row w-full max-w-4xl items-center  overflow-hidden">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Passwords must be at least 8 characters.
                </p>
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="save-password"
                    checked={savePassword}
                    onCheckedChange={(checked: boolean) =>
                      setSavePassword(checked)
                    }
                  />
                  <label
                    htmlFor="save-password"
                    className="text-gray-700 cursor-pointer"
                  >
                    Save the password
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="receive-offers"
                    checked={receiveOffers}
                    onCheckedChange={(checked: boolean) =>
                      setReceiveOffers(checked)
                    }
                  />
                  <label
                    htmlFor="receive-offers"
                    className="text-gray-700 cursor-pointer"
                  >
                    I would like to receive personalized commercial offers from
                    Cartzilla by email.
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-500 text-white py-2.5 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                Create an account
              </Button>
            </form>

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
            <p>© All rights reserved. Made by Createx Studio</p>
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
