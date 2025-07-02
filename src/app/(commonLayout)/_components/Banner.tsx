"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import React from "react";
import Image from "next/image";
import BannerImg from "../../../../public/assets/banner.png";

import Autoplay from "embla-carousel-autoplay";

const Banner: React.FC = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto"
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={BannerImg}
              className="w-full md:h-[550px] object-cover"
              alt="Banner Image"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Banner;
