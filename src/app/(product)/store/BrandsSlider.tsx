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

const slideData = [
  {
    id: 1,
    title: "상품 전체",
    query: "",
    imageUrl: SyattLogo,
    to: "/store/all",
  },
  {
    id: 2,
    title: "모던마스터즈",
    query: "modernMasters",
    imageUrl: ModernMastersLogo,
    to: "/store/modern-masters",
  },
  {
    id: 3,
    title: "마이다스메탈",
    query: "midasMetal",
    imageUrl: MidasMetalLogo,
    to: "/store/midas-metal",
  },
  {
    id: 4,
    title: "메탈이펙트",
    query: "metalEffect",
    imageUrl: MetalEffectLogo,
    to: "/store/metal-effect",
  },
  {
    id: 5,
    title: "컬러패스트",
    query: "colorFast",
    imageUrl: ColorFastLogo,
    to: "/store/color-fast",
  },
];

const BrandSlider = () => {
  const settings = {
    infinite: false,
    slidesToShow: slideData.length,
    slidesToScroll: 1,
    arrow: false,
  };
  return (
    <Slider {...settings}>
      {slideData.map(slide => (
        <CategoryToSearchLink
          key={slide.id}
          to={URLS.PRODUCT_STORE_SEARCH} // 추후 수정 (Issue #20)
          searchQuery={slide.query}
        >
          <div className="flex flex-col w-56 h-auto items-center justify-center mx-2">
            <div className="flex w-56 h-32 justify-center items-center border border-stone-300 rounded-lg  relative">
              <div className="flex relative justify-center items-center w-32">
                <Image src={slide.imageUrl} alt="brandLogo" />
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
};

export default BrandSlider;
