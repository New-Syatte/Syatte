"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SyattLogo from "@/assets/SYATT.svg";
import ModernMastersLogo from "@/assets/product/modern-masters-logo-inverted.png";
import MidasMetalLogo from "@/assets/product/midas-metal-logo-inverted.png";
import MetalEffectLogo from "@/assets/product/metal-effect-logo.png";
import ColorFastLogo from "@/assets/product/color-fast-logo.png";
import Image from "next/image";
import CategoryToSearchLink from "./CategoryToSearchLink";
import URLS from "@/constants/urls";
import { Mobile } from "@/hooks/useMediaQuery";

const slideData = [
  {
    id: 1,
    title: "모던마스터즈",
    query: "modernMasters",
    imageUrl: ModernMastersLogo,
    to: "/store/modern-masters",
  },
  {
    id: 2,
    title: "마이다스메탈",
    query: "midasMetal",
    imageUrl: MidasMetalLogo,
    to: "/store/midas-metal",
  },
  {
    id: 3,
    title: "메탈이펙트",
    query: "metalEffect",
    imageUrl: MetalEffectLogo,
    to: "/store/metal-effect",
  },
  {
    id: 4,
    title: "컬러패스트",
    query: "colorFast",
    imageUrl: ColorFastLogo,
    to: "/store/color-fast",
  },
];

const BrandSlider = () => {
  const isMobile = Mobile();
  if (!isMobile)
    return (
      <Slider
        infinite={false}
        slidesToShow={slideData.length}
        slidesToScroll={1}
        arrows={false}
        autoplay={false}
      >
        {slideData.map(slide => (
          <CategoryToSearchLink
            key={slide.id}
            to={URLS.PRODUCT_STORE_SEARCH} // 추후 수정 (Issue #20)
            searchQuery={slide.query}
          >
            <div className="flex flex-col w-56 h-auto items-center justify-center mx-2">
              <div className="flex w-56 h-32 justify-center items-center border border-stone-300 rounded-lg relative">
                <div className="flex relative justify-center items-center w-32 h-auto">
                  <Image
                    src={slide.imageUrl}
                    alt="brandLogo"
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="text-center text-black text-lg font-bold mt-5">
                {slide.title}
              </div>
            </div>
          </CategoryToSearchLink>
        ))}
      </Slider>
    );
  if (isMobile)
    return (
      <article className="grid grid-cols-2 gap-5">
        {slideData.map(slide => (
          <CategoryToSearchLink
            key={slide.id}
            to={URLS.PRODUCT_STORE_SEARCH} // 추후 수정 (Issue #20)
            searchQuery={slide.query}
          >
            <div className="flex flex-col w-full h-full min-h-[170px] max-h-[200px] items-center justify-center">
              <div className="flex w-full h-full p-4 justify-center items-center border border-stone-300 rounded-lg relative">
                <div className="flex justify-center items-center w-5/6 h-auto">
                  <Image
                    src={slide.imageUrl}
                    alt="brandLogo"
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <div className="text-center text-black text-lg font-bold mt-5">
                {slide.title}
              </div>
            </div>
          </CategoryToSearchLink>
        ))}
      </article>
    );
  else return <></>;
};

export default BrandSlider;
