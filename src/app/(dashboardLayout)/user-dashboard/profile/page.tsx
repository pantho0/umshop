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
import { Image, Lock, Mail, ShoppingCart, Star } from "lucide-react";

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
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
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
        <Button
          variant="outline"
          className="w-full flex items-center justify-start text-lg py-6"
        >
          <Star className="mr-3 h-5 w-5" /> Your Reviews
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};

export default ProfilePage;
