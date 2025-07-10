import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TOrder } from "@/interface";

const mockOrders: TOrder[] = [
  {
    orderId: "78A6431D409",
    orderDate: "Feb 6, 2025",
    status: "In progress",
    total: 2105.9,
    items: [
      { name: "Phone", image: "/placeholder.svg" },
      { name: "Laptop", image: "/placeholder.svg" },
    ],
  },
  {
    orderId: "47H76G09F33",
    orderDate: "Dec 12, 2024",
    status: "Delivered",
    total: 360.75,
    items: [{ name: "VR Headset", image: "/placeholder.svg" }],
  },
  {
    orderId: "502TR872W2",
    orderDate: "Nov 7, 2024",
    status: "Delivered",
    total: 4268.0,
    items: [
      { name: "Laptop", image: "/placeholder.svg" },
      { name: "Headphones", image: "/placeholder.svg" },
      { name: "Tablet", image: "/placeholder.svg" },
    ],
  },
  {
    orderId: "34V85540K83",
    orderDate: "Sep 15, 2024",
    status: "Canceled",
    total: 987.5,
    items: [
      { name: "Earbuds", image: "/placeholder.svg" },
      { name: "Phone", image: "/placeholder.svg" },
    ],
  },
  {
    orderId: "112P945A90V2",
    orderDate: "May 12, 2024",
    status: "Delivered",
    total: 53.0,
    items: [{ name: "Case", image: "/placeholder.svg" }],
  },
  {
    orderId: "28BA67U0981",
    orderDate: "Apr 20, 2024",
    status: "Canceled",
    total: 1029.5,
    items: [
      { name: "Camera", image: "/placeholder.svg" },
      { name: "Controller", image: "/placeholder.svg" },
    ],
  },
];

const StatusBadge = ({ status }: { status: TOrder["status"] }) => {
  const statusStyles = {
    Delivered: "bg-green-100 text-green-800 border-green-200",
    "In progress": "bg-blue-100 text-blue-800 border-blue-200",
    Canceled: "bg-red-100 text-red-800 border-red-200",
  };
  const dotStyles = {
    Delivered: "bg-green-500",
    "In progress": "bg-blue-500",
    Canceled: "bg-red-500",
  };

  return (
    <Badge variant="outline" className={`capitalize ${statusStyles[status]}`}>
      <span className={`mr-2 h-2 w-2 rounded-full ${dotStyles[status]}`}></span>
      {status}
    </Badge>
  );
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle className="text-2xl mb-4 md:mb-0">Orders</CardTitle>
            {/* Filter buttons can be added here */}
          </div>
        </CardHeader>
      </Card>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Order #</TableHead>
                  <TableHead>Order date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-md p-1 flex items-center justify-center"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                            +{order.items.length - 3}
                          </div>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {mockOrders.map((order) => (
          <Card key={order.orderId} className="overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order #</p>
                  <p className="font-medium">{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{order.orderDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Items</p>
                <div className="flex items-center space-x-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md p-1 flex items-center justify-center"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                View Details
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination can be added here */}
    </div>
  );
}
