"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Lock, User } from "lucide-react";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdatePassword } from "@/hooks/auth.hook";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const SettingsPage: React.FC = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    "https://github.com/shadcn.png"
  ); // Dummy avatar
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: updatePassword, isSuccess } = useUpdatePassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    updatePassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut());
      router.push("/");
    }
  }, [isSuccess]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = () => {
    if (avatarFile) {
      console.log("Uploading avatar:", avatarFile.name);
      // Implement avatar upload logic here
      alert("Avatar upload functionality not implemented yet.");
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password Section */}
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <Lock className="mr-2 h-6 w-6 text-purple-600" /> Change Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Update your account password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UMForm onSubmit={onSubmit}>
              <div className="space-y-6">
                <div className="space-y-2 ">
                  <UMInput
                    type="password"
                    label="Old Password"
                    name="oldPassword"
                    placeholder="Enter your old password"
                  />
                </div>
                <div className="space-y-2">
                  <UMInput
                    type="password"
                    label="New Password"
                    name="newPassword"
                    placeholder="Enter your old password"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 mt-5"
              >
                Change Password
              </Button>
            </UMForm>
          </CardContent>
        </Card>

        {/* Update Avatar Section */}
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <User className="mr-2 h-6 w-6 text-purple-600" /> Update Avatar
            </CardTitle>
            <CardDescription className="text-gray-600">
              Upload a new profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <Avatar className="h-32 w-32 border-4 border-purple-500 shadow-md">
              <AvatarImage
                src={avatarPreview || "/placeholder-avatar.jpg"}
                alt="Avatar Preview"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
              <Label htmlFor="avatar-upload" className="sr-only">
                Upload Avatar
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>
            <Button
              onClick={handleAvatarUpload}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <UploadCloud className="mr-2 h-5 w-5" /> Upload Avatar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
