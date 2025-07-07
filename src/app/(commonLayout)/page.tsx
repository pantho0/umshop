import React from "react";
import Banner from "./_components/Banner";
import BannerBottom from "./_components/BannerBottom";
import ContainerLayout from "./_components/layouts/ContainerLayout";
import NewArraivals from "./_components/new arraivals/NewArraivals";
import TrandingProducts from "./_components/trandingProduct/TrandingProducts";
import DiscountBanner from "./_components/discountedSection/DiscountBanner";
import SpecialOffersSection from "./_components/SpecialOffers/SpecialOffersSection";

const HomePage = () => {
  return (
    <>
      <Banner />
      <ContainerLayout>
        <BannerBottom />
        <NewArraivals />
        <TrandingProducts />
        <DiscountBanner />
        <SpecialOffersSection />
      </ContainerLayout>
    </>
  );
};

export default HomePage;
