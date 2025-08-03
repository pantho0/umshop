"use client";

import { Input } from "@/components/ui/input";
import { useSearchProduct } from "@/hooks/product.hooks";
import useDebounce from "@/hooks/useDebounce.hook";
import { IProductResult } from "@/interface";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const { handleSubmit, watch, register, setValue } = useForm();
  const [searchResult, setSearchResult] = useState([]);

  const searchTerm = useDebounce(watch("search"));

  const {
    mutate: handleSearch,
    data,
    isPending,
    isSuccess,
  } = useSearchProduct(searchTerm);
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResult([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResult(data?.data?.result);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className=" md:flex flex-grow mx-8 max-w-xl relative">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="relative">
          <Input
            {...register("search")}
            type="search"
            placeholder="Search products..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {searchResult.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-gray-200 backdrop-blur-md border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-3">
            {searchResult.map((product: IProductResult, idx) => (
              <div key={product._id || idx}>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={() => {
                    setSearchResult([]);
                    setValue("search", "");
                  }}
                >
                  <div className="flex items-center gap-3 p-2 text-black hover:bg-primary hover:text-white cursor-pointer rounded-md transition-all">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-10 h-10 rounded object-cover border"
                    />
                    <p className="text-sm font-medium line-clamp-2">
                      {product?.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {isPending && (
          <div className="absolute left-0 right-0 mt-2 bg-gray-200 backdrop-blur-md border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-3">
            <div className="w-full block">
              <p className="text-sm text-black">Searching...</p>
            </div>
          </div>
        )}

        {!isPending && searchResult.length === 0 && searchTerm && (
          <div className="absolute left-0 right-0 mt-2 bg-gray-200 backdrop-blur-md border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-3">
            <div className="w-full block">
              <p className="text-sm text-black">No products found with your searched criteria</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
