import React from "react";
import ReactPaginate from "react-paginate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Meta } from "@/interface";

interface PaginationControlsProps {
  filters: { page?: number; limit?: number };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      searchTerm?: string;
      status?: string;
      page?: number;
      limit?: number;
    }>
  >;
  meta: Meta | undefined;
  handlePageChange: ({ selected }: { selected: number }) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  filters,
  setFilters,
  meta,
  handlePageChange,
}) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 mt-6">
      {meta && meta.totalPage >= 1 && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <div className="flex justify-center mr-4">
            <Select
              value={filters.limit?.toString() || "10"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  limit: Number(value),
                  page: 1,
                }))
              }
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap justify-center cursor-pointer">
            <ReactPaginate
              key={`${filters.page}-${meta?.totalPage}`}
              breakLabel={"..."}
              previousLabel={null}
              nextLabel={null}
              pageCount={meta!.totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={"flex space-x-2 text-sm"}
              pageClassName={
                "w-8 h-8 flex items-center justify-center border rounded border-gray-300"
              }
              activeClassName={"bg-primary text-white border-primary"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
              forcePage={(filters.page || 1) - 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
