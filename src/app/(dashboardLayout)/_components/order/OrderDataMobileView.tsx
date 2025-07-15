import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IOrder } from "@/interface";
import { MoreHorizontal } from "lucide-react";
import StatusUpdate from "./StatusUpdate";

export const OrderDataMobileView = ({ ordersData }: IOrder[] | any) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {ordersData?.map((order: IOrder) => {
        const orderDate = new Date(order.createdAt as Date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        const formattedTotal = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(order.grandTotal);

        let statusVariant: "default" | "secondary" | "destructive" | "outline" =
          "default";
        let statusColorClass = "";

        switch (order.status) {
          case "Pending":
            statusVariant = "secondary";
            statusColorClass =
              "bg-orange-100 text-orange-800 hover:bg-orange-200";
            break;
          case "Completed":
            statusVariant = "default";
            statusColorClass = "bg-green-100 text-green-800 hover:bg-green-200";
            break;
          case "Cancelled":
            statusVariant = "destructive";
            statusColorClass = "bg-red-100 text-red-800 hover:bg-red-200";
            break;
          default:
            statusVariant = "outline";
            statusColorClass = "bg-gray-100 text-gray-800 hover:bg-gray-200";
        }

        return (
          <Card
            key={order._id}
            className="rounded-lg shadow-md border border-gray-200"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Order ID: {order.orderId!}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Placed on: {orderDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-gray-700">
              <p>
                <strong>Customer:</strong> {order.fullName}
              </p>
              <p className="flex items-center gap-2">
                <strong>Status:</strong>{" "}
                <Badge
                  variant={statusVariant}
                  className={`capitalize ${statusColorClass}`}
                >
                  {order.status}
                </Badge>
              </p>
              <p>
                <strong>Total:</strong> {formattedTotal}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              {/* View Details Button for Card, using Shadcn Sheet */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">
                    <span className="sr-only">Open menu</span>
                    Take Action
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
                  <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                  <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
