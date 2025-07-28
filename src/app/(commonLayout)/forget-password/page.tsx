"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";
import { useForgetPass } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ForgetPasswordPage = () => {
  const { mutate: handleForgetPass } = useForgetPass();
  const router = useRouter();

  const handleSubmit: SubmitHandler<FieldValues> = (forgetPassInfo) => {
    const toastId = toast.loading("Sending reset link...");
    handleForgetPass(forgetPassInfo, {
      onSuccess: () => {
        router.push("/login");
        toast.success(
          "Reset link sent to your email. Check inbox/spam folder please",
          {
            id: toastId,
            duration: 4000,
          }
        );
      },
      onError: (error) => {
        toast.error(error.message, {
          id: toastId,
          duration: 4000,
        });
      },
    });
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
                label="Email"
                type="email"
                placeholder="m@example.com"
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

export default ForgetPasswordPage;
