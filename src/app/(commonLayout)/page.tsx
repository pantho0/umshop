import React from "react";
import Banner from "./_components/Banner";
import BannerBottom from "./_components/BannerBottom";
import ContainerLayout from "./_components/layouts/ContainerLayout";
import NewArraivals from "./_components/new arraivals/NewArraivals";
import TrandingProducts from "./_components/trandingProduct/TrandingProducts";
import DiscountBanner from "./_components/discountedSection/DiscountBanner";
import SpecialOffersSection from "./_components/SpecialOffers/SpecialOffersSection";
import nexiosInstance from "@/app/config/nexios.config";
import { ApiResponse, Product } from "@/interface";

const HomePage = async () => {
  let products: Product[] = [];

  try {
    const response = await nexiosInstance.get<ApiResponse<Product[]>>(
      "/products?limit=7&sortBy=-createdAt"
    );

    if (response?.data?.data && Array.isArray(response.data.data)) {
      products = response.data.data;
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
