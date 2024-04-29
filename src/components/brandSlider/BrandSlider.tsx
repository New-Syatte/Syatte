/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slideData = [
  {
    id: 1,
    content: "Slide1",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_1.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
  {
    id: 1,
    content: "Slide2",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_2.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
  {
    id: 1,
    content: "Slide3",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_3.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
  {
    id: 1,
    content: "Slide4",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_4.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
  {
    id: 1,
    content: "Slide5",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_5.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
];

const BrandSlider = (activeBrandIndex: any) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };

  return (
    <div className="w-[1300px] h-[420px] border border-[#E2E2E2] sm:w-full sm:h-full">
      <Slider {...settings}>
        {slideData.map(slide => (
          <div key={slide.id}>
            <div className="flex h-[420px] sm:flex-col sm:h-full sm:py-[20px] sm:px-[35px]">
              <div className="flex w-[40%] h-[240px] justify-center my-auto sm:h-full sm:w-[30%] sm:mx-auto">
                <img src={slide.imageUrl} />
              </div>
              <div className="flex w-[60%] flex-col my-auto sm:w-full">
                <div className="flex w-full">
                  <img src={slide.brandImgUrl} className="w-[400px] sm:w-[150px] sm:mx-auto sm:mt-[20px]" />
                </div>
                <div className="flex text-[18px] mt-[45px] mb-[25px] sm:text-[10px] sm:my-[20px] sm:mx-auto">
                  {slide.features}
                </div>
                <div className="flex text-[18px] w-[730px] sm:w-full sm:text-[14px]">
                  {slide.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandSlider;
