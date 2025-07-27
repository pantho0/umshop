
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProductSkeleton = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        <Skeleton className="h-8 w-32" />
      </h2>
      {/* Skeleton for desktop view (table) */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-48" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-6 w-32" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-16 h-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Skeleton for mobile view (cards) */}
      <div className="md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded" />
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
