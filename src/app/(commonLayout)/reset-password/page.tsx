"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

const PasswordResetPage = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (resetPassInfo) => {
    console.log(resetPassInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UMForm onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <UMInput
                name="email"
                label="Your Email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <UMInput
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />
            </div>
            <Button type="submit" className="w-full mt-5">
              Send Reset Link
            </Button>
          </UMForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetPage;
