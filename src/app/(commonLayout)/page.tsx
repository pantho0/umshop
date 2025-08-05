import React from "react";
export const dynamic = "force-dynamic";
import Banner from "./_components/Banner";
import BannerBottom from "./_components/BannerBottom";
import ContainerLayout from "./_components/layouts/ContainerLayout";
import NewArraivals from "./_components/new arraivals/NewArraivals";
import TrandingProducts from "./_components/trandingProduct/TrandingProducts";
import DiscountBanner from "./_components/discountedSection/DiscountBanner";
import SpecialOffersSection from "./_components/SpecialOffers/SpecialOffersSection";
import nexiosInstance from "@/app/config/nexios.config";
import { ApiResponse, Product, IProductResult } from "@/interface";

const HomePage = async () => {
  let products: IProductResult[] = [];

  try {
    const response = await nexiosInstance.get<ApiResponse<Product>>(
      "/products?limit=7&sortBy=-createdAt",
      { cache: "force-cache" }
    );

    if (response?.data?.data && Array.isArray(response?.data?.data?.result)) {
      products = response.data.data?.result;
    } else {
      console.warn("Unexpected API response structure:", response.data);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      <Banner />
      <ContainerLayout>
        <BannerBottom />
        <NewArraivals />
        <TrandingProducts products={products} />
        <DiscountBanner />
        <SpecialOffersSection products={products} />
      </ContainerLayout>
    </>
  );
};

export default HomePage;
