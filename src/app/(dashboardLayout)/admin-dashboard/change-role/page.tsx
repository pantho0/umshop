"use client";
import { useChangeUserRole, useGetSingleUser } from "@/hooks/auth.hook";
import { dataTagErrorSymbol } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ChangeRole = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const { data: userInfo } = useGetSingleUser(id!);
  const { mutate: changeRole } = useChangeUserRole();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState(userInfo?.role! || "");

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleUpdateRole = () => {
    const toastId = toast.loading("Changing User Role...");
    const userRoleInfo = {
      id: id!,
      role: selectedRole,
    };
    console.log(userRoleInfo);
    changeRole(userRoleInfo, {
      onSuccess: () => {
        toast.success("User Role Updated Successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push("/admin-dashboard/user-management");
      },
      onError: (error: any) => {
        toast.error(error.message, {
          id: toastId,
          duration: 2000,
        });
        router.push("/admin-dashboard/user-management");
      },
    });
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Change User Role</CardTitle>
            <CardDescription>
              Update the role for {userInfo.firstName} {userInfo.lastName}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name:
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userInfo.firstName.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name:
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userInfo.lastName.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email:
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userInfo.email}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Role:
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userInfo.role.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="role">Select New Role</label>
                <Select onValueChange={handleRoleChange} value={selectedRole}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue
                      placeholder="Select a role"
                      className="w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateRole} className="mt-4">
                Update Role
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChangeRole;
