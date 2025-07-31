"use client"; // This directive is correctly placed

import { useChangeUserRole, useGetSingleUser } from "@/hooks/auth.hook";
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
import { useState, Suspense, useEffect } from "react"; // Import Suspense and useEffect
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Create a separate component that contains the logic using useSearchParams
// This component will be wrapped in Suspense.
const ChangeRoleContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");

  // All React Hooks must be called unconditionally at the top level of the component.
  // The order of these calls must be consistent across all renders.
  const router = useRouter();
  const { mutate: changeRole } = useChangeUserRole();
  // We use the 'enabled' option (common in react-query) to prevent the query
  // from running if 'id' is not available yet.
  const { data: userInfo, isLoading, isError } = useGetSingleUser(id as string);
  const [selectedRole, setSelectedRole] = useState("");

  // Use useEffect to set the initial role once userInfo is loaded.
  // This hook runs side effects after rendering and re-runs if dependencies change.
  useEffect(() => {
    if (userInfo && userInfo.role && selectedRole === "") {
      setSelectedRole(userInfo.role);
    }
  }, [userInfo, selectedRole]); // Dependencies ensure this runs when userInfo or selectedRole changes

  // Now, after all hooks have been called, you can conditionally render based on 'id'.
  // This ensures hooks are always called in the same order.
  if (!id) {
    // You might want to redirect or show an error message if userId is missing
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>User ID not found in URL.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Use router.push for navigation instead of window.history.back() */}
            <Button
              onClick={() => router.push("/admin-dashboard/user-management")}
            >
              Go to User Management
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleUpdateRole = () => {
    const toastId = toast.loading("Changing User Role...");
    const userRoleInfo = {
      id: id, // id is guaranteed to be a string here due to the check above
      role: selectedRole,
    };
    changeRole(userRoleInfo, {
      onSuccess: () => {
        toast.success("User Role Updated Successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push("/admin-dashboard/user-management");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update user role.", {
          // Provide a fallback error message
          id: toastId,
          duration: 2000,
        });
        // Consider not redirecting on error, or providing a retry option
        // router.push("/admin-dashboard/user-management");
      },
    });
  };

  // Show skeleton loading state while data is being fetched
  if (isLoading || !userInfo) {
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

  // Handle error state if fetching user info fails
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load user information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Retry</Button>
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
              <Button
                onClick={handleUpdateRole}
                className="mt-4"
                disabled={selectedRole === userInfo.role}
              >
                Update Role
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// The main page component that renders the Suspense boundary
const ChangeRole = () => {
  return (
    <Suspense
      fallback={
        // This fallback will be shown during server-side rendering
        // and while the client-side component is hydrating/loading.
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
      }
    >
      <ChangeRoleContent />
    </Suspense>
  );
};

export default ChangeRole;
