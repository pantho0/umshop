"use client";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IOrderResult } from "@/interface";
import { MoreHorizontal, Loader2 } from "lucide-react";

import StatusUpdate from "./StatusUpdate";
import { useCancelOrder } from "@/hooks/order.hook";

const OrderDataTable = ({
  ordersData,
  isLoading,
}: {
  ordersData: IOrderResult[];
  isLoading: boolean;
}) => {
  const { mutate: cancelOrder } = useCancelOrder();
  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
  };
  return (
    <>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="h-12 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </TableHead>
            <TableHead className="h-12 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Name
            </TableHead>
            <TableHead className="h-12 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Email
            </TableHead>
            <TableHead className="h-12 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </TableHead>
            <TableHead className="h-12 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="h-12 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Date
            </TableHead>
            <TableHead className="h-12 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading orders...
                </div>
              </TableCell>
            </TableRow>
          ) : ordersData?.length ? (
            ordersData?.map((order: IOrderResult, index: number) => {
              const orderDate = new Date(
                order.createdAt as Date
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const formattedTotal = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(order.grandTotal);

              let statusVariant:
                | "default"
                | "secondary"
                | "destructive"
                | "outline" = "default";
              let statusColorClass = "";

              switch (order.status) {
                case "Pending":
                  statusVariant = "secondary";
                  statusColorClass =
                    "bg-orange-100 text-orange-800 hover:bg-orange-200";
                  break;
                case "Completed":
                  statusVariant = "default";
                  statusColorClass =
                    "bg-green-100 text-green-800 hover:bg-green-200";
                  break;
                case "Cancelled":
                  statusVariant = "destructive";
                  statusColorClass = "bg-red-100 text-red-800 hover:bg-red-200";
                  break;
                default:
                  statusVariant = "outline";
                  statusColorClass =
                    "bg-gray-100 text-gray-800 hover:bg-gray-200";
              }

              return (
                <TableRow
                  key={order._id}
                  className={`border-b transition-colors hover:bg-muted/50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell className="p-4 align-middle font-medium">
                    {order.orderId}
                  </TableCell>
                  <TableCell className="p-4 align-middle">
                    {order.fullName}
                  </TableCell>
                  <TableCell className="p-4 align-middle">
                    {order.email}
                  </TableCell>
                  <TableCell className="p-4 align-middle text-right">
                    {formattedTotal}
                  </TableCell>
                  <TableCell className="p-4 align-middle">
                    <Badge
                      variant={statusVariant}
                      className={`capitalize ${statusColorClass}`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 align-middle">
                    {orderDate}
                  </TableCell>
                  <TableCell className="p-4 align-middle text-right">
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
                          onClick={() => {
                            const el = document.createElement("textarea");
                            el.value = order.orderId!;
                            document.body.appendChild(el);
                            el.select();
                            document.execCommand("copy");
                            document.body.removeChild(el);
                            alert("Order ID copied to clipboard!");
                          }}
                        >
                          Copy order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <StatusUpdate order={order} />
                        {/* <DropdownMenuItem>Mark as Completed</DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() => handleCancelOrder(order._id!)}
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={7} // Updated colspan to match the number of headers
                className="h-24 text-center text-gray-500"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderDataTable;
