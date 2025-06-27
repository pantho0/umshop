import React from "react";
import Banner from "./_components/Banner";
import BannerBottom from "./_components/BannerBottom";
import ContainerLayout from "./_components/layouts/ContainerLayout";
import NewArraivals from "./_components/new arraivals/NewArraivals";

const HomePage = () => {
  return (
    <>
      <Banner />
      <ContainerLayout>
        <BannerBottom />
        <NewArraivals />
      </ContainerLayout>
    </>
  );
};

export default HomePage;
