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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IOrder } from "@/interface";

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
                Order ID: {order._id!.substring(0, 8)}...
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-md shadow-sm"
                  >
                    View Details
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      Order Details: {order._id!.substring(0, 8)}...
                    </SheetTitle>
                    <SheetDescription>
                      Detailed information about this order.
                    </SheetDescription>
                  </SheetHeader>
                  {/* THIS SECTION IS NOW IDENTICAL TO DESKTOP'S SHEET CONTENT */}
                  <div className="grid gap-4 p-6 text-sm border m-2 rounded-md">
                    <p>
                      <strong>Customer:</strong> {order.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {order.mobileNumber}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.detailsInformation},{" "}
                      {order.upazilla}, {order.district}
                    </p>
                    <p>
                      <strong>Payment Method:</strong>{" "}
                      {order.paymentMethod
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <Badge
                        variant={
                          order.status === "Pending"
                            ? "secondary"
                            : order.status === "Completed"
                            ? "default"
                            : order.status === "Cancelled"
                            ? "destructive"
                            : "outline"
                        }
                        className={`capitalize ${
                          order.status === "Pending"
                            ? "bg-orange-100 text-orange-800"
                            : order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </p>
                    <p>
                      <strong>Total:</strong> ${order.grandTotal.toFixed(2)}
                    </p>
                    <p className="font-semibold mt-2">Ordered Items:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {order.orderedItems.map((item) => (
                        <li key={item.id}>
                          <div className="flex flex-col gap-2 border p-3 rounded-md">
                            {item.image && item.image[0] && (
                              <img
                                src={item.image[0]}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded-md"
                                onError={(e) => {
                                  e.currentTarget.src = `https://placehold.co/40x40/f0f0f0/cccccc?text=No+Image`;
                                }}
                              />
                            )}
                            <div>
                              {item.name} (Qty: {item.quantity}) - $
                              {item.price.toFixed(2)}
                            </div>
                            <div>
                              <p> Model: {item.model}</p>
                              <p> Color : {item.color}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SheetContent>
              </Sheet>
              {/* Example Action Button for Card */}
              <Button size="sm" className="rounded-md shadow-sm">
                Take Action
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
