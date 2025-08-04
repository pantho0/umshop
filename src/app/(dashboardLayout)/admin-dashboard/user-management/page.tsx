"use client";
import {
  useChangeIsBlockStatus,
  useGetAllUser,
  useUserDeleteStatus,
} from "@/hooks/auth.hook";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserManagement = () => {
  const { data, isPending, isSuccess } = useGetAllUser();
  const { mutate: changeIsBlock } = useChangeIsBlockStatus();
  const { mutate: deleteUser } = useUserDeleteStatus();
  const users = data?.data || [];
  const router = useRouter();

  const changeUserBlockStatus = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-500 p-2 ml-2 text-white rounded-sm",
        cancelButton: "bg-gray-500 p-2 text-white rounded-sm",
      },
      background: "#000",
      color: "#fff",
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want to change this user's block status?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("Changing user status");
          changeIsBlock(
            { id: id },
            {
              onSuccess: () => {
                toast.success("User block status updated", { id: toastId });
              },
              onError: () => {
                toast.error("Failed to change user status", { id: toastId });
              },
            }
          );

          swalWithBootstrapButtons.fire({
            background: "#000",
            color: "#fff",
            title: "Block Status Changed!",
            text: "User block status has been updated.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const changeDeleteStatus = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-500 p-2 ml-2 text-white rounded-sm",
        cancelButton: "bg-gray-500 p-2 text-white rounded-sm",
      },
      background: "#000",
      color: "#fff",
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want to change this user's delete status?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("Changing user status");
          deleteUser(
            { id: id },
            {
              onSuccess: () => {
                toast.success("User delete status updated", { id: toastId });
              },
              onError: () => {
                toast.error("Failed to change user status", { id: toastId });
              },
            }
          );
          swalWithBootstrapButtons.fire({
            background: "#000",
            color: "#fff",
            title: "Delete Status Changed!",
            text: "User delete status has been updated.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isPending) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="hidden md:block">
          <div className="border rounded-md p-4">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:hidden">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <p>Failed to load users. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Blocked</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.isBlocked ? "destructive" : "outline"}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isDeleted ? "destructive" : "outline"}>
                      {user.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => changeUserBlockStatus(user._id)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => changeDeleteStatus(user._id)}
                        >
                          {user.isDeleted ? "Restore" : "Delete"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/admin-dashboard/change-role?userId=${user._id}`
                            )
                          }
                        >
                          Change Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <Card key={user._id}>
            <CardHeader>
              <CardTitle>{user.email}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Blocked:</strong>{" "}
                <Badge variant={user.isBlocked ? "destructive" : "outline"}>
                  {user.isBlocked ? "Blocked" : "Active"}
                </Badge>
              </p>
              <p>
                <strong>Deleted:</strong>{" "}
                <Badge variant={user.isDeleted ? "destructive" : "outline"}>
                  {user.isDeleted ? "Deleted" : "Active"}
                </Badge>
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    changeIsBlock(
                      { id: user!._id },
                      {
                        onSuccess: () => {
                          toast.success("User block status updated");
                        },
                      }
                    )
                  }
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changeDeleteStatus(user._id)}
                >
                  {user.isDeleted ? "Restore" : "Delete"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/admin-dashboard/change-role?userId=${user._id}`
                    )
                  }
                >
                  Change Role
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
