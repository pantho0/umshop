import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUpdateOrderStatus } from "@/hooks/order.hook";
import { IOrder } from "@/interface";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { toast } from "sonner";

const StatusUpdate = ({ order }: { order: IOrder }) => {
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const user = useAppSelector(selectUser);
  const role = user?.role;
  const handleStatusChange = (orderId: string, statusOption: string) => {
    if (statusOption === "Pending") {
      updateStatus({ orderId, statusOption });
    } else if (statusOption === "In progress") {
      updateStatus({ orderId, statusOption });
    } else if (statusOption === "Completed") {
      updateStatus({ orderId, statusOption });
    } else if (statusOption === "Canceled") {
      updateStatus({ orderId, statusOption });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          View Order Details
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Order Details: {order.orderId}</SheetTitle>
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
          <p>Change Status: </p>
          {role && role === "admin" && (
            <div className="grid grid-cols-2 gap-4">
              <Badge
                onClick={() => handleStatusChange(order._id!, "Pending")}
                variant={"secondary"}
                className={`capitalize ${"bg-orange-100 text-orange-800 cursor-pointer"}`}
              >
                Pending
              </Badge>
              <Badge
                onClick={() => handleStatusChange(order._id!, "In progress")}
                variant={"secondary"}
                className={`capitalize ${"bg-blue-100 text-blue-800 cursor-pointer"}`}
              >
                In progress
              </Badge>
              <Badge
                onClick={() => handleStatusChange(order._id!, "Completed")}
                variant={"secondary"}
                className={`capitalize ${"bg-green-100 text-green-800 cursor-pointer"}`}
              >
                Delivered
              </Badge>
              <Badge
                onClick={() => handleStatusChange(order._id!, "Canceled")}
                variant={"secondary"}
                className={`capitalize ${"bg-red-100 text-red-800 cursor-pointer"}`}
              >
                Canceled
              </Badge>
            </div>
          )}
          <p>
            <strong>Total:</strong> ${order.grandTotal.toFixed(2)}
          </p>
          <p className="font-semibold mt-2">Ordered Items:</p>
          <ul className=" list-disc pl-5 space-y-1">
            {order.orderedItems.map((item, idx) => (
              <li key={idx}>
                <div className="flex flex-col gap-2 border p-3 rounded-md">
                  {item.image && item.image[0] && (
                    <Image
                      width={40}
                      height={40}
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
  );
};

export default StatusUpdate;
