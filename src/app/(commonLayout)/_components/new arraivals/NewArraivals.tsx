import React from "react";
import nexiosInstance from "@/app/config/nexios.config";
import { NewArraivalsClient } from "./_components/NewArraivalsClient";
import { ApiResponse, IProductResult } from "@/interface";

const NewArraivals: React.FC = async () => {
  const { data } = await nexiosInstance.get<
    ApiResponse<IProductResult[] | any>
  >("/products?limit=7&sortBy=createdAt", {
    cache: "force-cache",
  });
  const products = data.data!.result;

  return (
    <section className="container mx-auto px-4 py-8 md:py-10 max-w-7xl">
      <h2 className="text-lg md:text-4xl font-semibold  text-gray-900 mb-6 md:mb-6">
        New arrivals
      </h2>

      <NewArraivalsClient products={products!} />
    </section>
  );
};

export default NewArraivals;
