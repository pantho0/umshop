import React from "react";
import nexiosInstance from "@/app/config/nexios.config";
import { NewArraivalsClient } from "./_components/NewArraivalsClient";
import { ApiResponse, Product } from "@/interface";

const NewArraivals: React.FC = async () => {
  const { data } = await nexiosInstance.get<ApiResponse<Product[]>>(
    "/products?limit=7&sortBy=-createdAt"
    // {
    //   next: {
    //     revalidate: 30,
    //   },
    // }
  );
  const products = data.data;

  return (
    <section className="container mx-auto px-4 py-8 md:py-10 max-w-7xl">
      <h2 className="text-lg md:text-4xl font-semibold  text-gray-900 mb-6 md:mb-6">
        New arrivals
      </h2>

      <NewArraivalsClient products={products} />
    </section>
  );
};

export default NewArraivals;
