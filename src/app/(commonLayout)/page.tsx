import React from "react";
import Banner from "./_components/Banner";
import BannerBottom from "./_components/BannerBottom";
import ContainerLayout from "./_components/layouts/ContainerLayout";

const HomePage = () => {
  return (
    <>
      <Banner />
      <ContainerLayout>
        <BannerBottom />
      </ContainerLayout>
    </>
  );
};

export default HomePage;
