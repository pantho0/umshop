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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/interface";
import { MoreHorizontal } from "lucide-react";

const OrderDataTable = ({ ordersData }: IOrder[] | any) => {
  return (
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
        {ordersData?.length ? (
          ordersData?.map((order: IOrder) => {
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
                className="border-b transition-colors hover:bg-muted/50"
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
                <TableCell className="p-4 align-middle">{orderDate}</TableCell>
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
                      <Sheet>
                        <SheetTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            View Order Details
                          </DropdownMenuItem>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>
                              Order Details: {order._id!.substring(0, 8)}
                              ...
                            </SheetTitle>
                            <SheetDescription>
                              Detailed information about this order.
                            </SheetDescription>
                          </SheetHeader>
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
                              <strong>Address:</strong>{" "}
                              {order.detailsInformation}, {order.upazilla},{" "}
                              {order.district}
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
                              <strong>Total:</strong> $
                              {order.grandTotal.toFixed(2)}
                            </p>
                            <p className="font-semibold mt-2">Ordered Items:</p>
                            <ul className=" list-disc pl-5 space-y-1">
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
                      <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Order</DropdownMenuItem>
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
  );
};

export default OrderDataTable;
