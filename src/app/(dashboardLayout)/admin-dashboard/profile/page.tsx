"use client";

import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Image, Lock, Mail, ShoppingCart } from "lucide-react";

export interface IUserProfile {
  name: string;
  email: string | undefined;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const loggedUser = useAppSelector(selectUser);
  const user: IUserProfile = {
    name: loggedUser?.firstName + " " + loggedUser?.lastName,
    email: loggedUser?.email,
    avatarUrl: loggedUser?.image || "https://github.com/shadcn.png",
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 flex flex-col lg:flex-row gap-4 justify-center items-start lg:items-center">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-purple-500 shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {user.name}
          </CardTitle>
          <CardDescription className="text-gray-600 flex items-center justify-center mt-1">
            <Mail className="h-4 w-4 mr-2 text-gray-500" /> {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <Button
            variant="outline"
            className="w-full flex items-center justify-start text-lg py-6"
          >
            <Lock className="mr-3 h-5 w-5" /> Change Password
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start text-lg py-6"
          >
            <Image className="mr-3 h-5 w-5" /> Change Avatar
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start text-lg py-6"
          >
            <ShoppingCart className="mr-3 h-5 w-5" /> View All Orders
          </Button>
        </CardContent>
      </Card>

      {/* Statistics Cards Section */}
      <div className="w-full max-w-md lg:max-w-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Total Pending Orders Card */}
        <Card className="shadow-lg rounded-lg p-4">
          <CardHeader className="pb-2">
            <CardDescription>Total Pending Orders</CardDescription>
            <CardTitle className="text-2xl">15</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">Orders awaiting processing</p>
          </CardContent>
        </Card>

        {/* Total Completed Orders Card */}
        <Card className="shadow-lg rounded-lg p-4">
          <CardHeader className="pb-2">
            <CardDescription>Total Completed Orders</CardDescription>
            <CardTitle className="text-2xl">120</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Orders successfully delivered
            </p>
          </CardContent>
        </Card>

        {/* Total Income Card */}
        <Card className="shadow-lg rounded-lg p-4 md:col-span-2 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-2xl">$15,000</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">Overall earnings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
