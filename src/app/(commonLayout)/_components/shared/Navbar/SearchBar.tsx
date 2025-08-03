"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const { handleSubmit, watch, register } = useForm();
  //    const { mutate: handleSearch, data, isPending, isSuccess } = useSearchPost();
  const [searchResult, setSearchResult] = useState([]);

  const searchTerm = watch("search");

  //    useEffect(() => {
  //      if (searchTerm) {
  //        handleSearch(searchTerm);
  //      }
  //    }, [searchTerm]);

  //    useEffect(() => {
  //      if (!searchTerm) {
  //        setSearchResult([]);
  //      }
  //      if (!isPending && isSuccess && data && searchTerm) {
  //        setSearchResult(data?.data?.result);
  //      }
  //    }, [isPending, isSuccess, data, searchTerm]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="hidden md:flex flex-grow mx-8 max-w-xl relative">
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
            {searchResult.map((post: any, idx) => (
              <div key={post._id || idx}>
                <Link href={`/posts/${post._id}`}>
                  <div className="flex items-center gap-3 p-2 text-black hover:bg-primary hover:text-white cursor-pointer rounded-md transition-all">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-10 h-10 rounded object-cover border"
                    />
                    <p className="text-sm font-medium line-clamp-2">
                      {post?.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* {isPending && ( 
           <div className="absolute left-0 right-0 mt-2 bg-gray-200 backdrop-blur-md border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-3">
             <div className="w-full block">
               <p className="text-sm text-black">Searching...</p>
             </div>
           </div>
         )} */}
      </form>
    </div>
  );
};

export default SearchBar;
