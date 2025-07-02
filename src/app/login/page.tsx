/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import LoginImage from "../../../public/assets/login.jpg";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
    alert("Login functionality not implemented in this demo.");
  };

  return (
    <div className="font-inter antialiased min-h-screen flex items-center justify-center p-4">
      <div className=" rounded-lg flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <img
                src="https://placehold.co/40x40/FF0000/FFFFFF?text=C"
                alt="Cartzilla Logo"
                className="h-10 w-10 mb-4"
              />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 text-sm">
                Do not have an account?{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Create an account
                </a>
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
              </div>

              <div className="flex justify-between items-center text-sm">
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
                <a
                  href="#"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-500 text-white py-2.5 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                Sign in
              </Button>
            </form>

            <div className="flex  my-6">
              <Separator className="flex-grow bg-gray-200" />

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

        {/* Right Section: Image */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-100 relative">
          <Image
            src={LoginImage} // Placeholder image
            alt="Smiling woman using phone"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x800/E0E0E0/333333?text=Image+Error`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
