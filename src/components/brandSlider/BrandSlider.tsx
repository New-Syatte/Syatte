/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

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
    id: 2,
    content: "Slide2",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_2.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 표출해냅니다.",
  },
  {
    id: 3,
    content: "Slide3",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_3.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
  {
    id: 4,
    content: "Slide4",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_4.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
  {
    id: 5,
    content: "Slide5",
    imageUrl: "/brand/modernmasters-img/modernmasters-series_1.png",
    brandImgUrl: "/brand/modernmasters-img/modernmasters-brand-logo_5.png",
    features: "브러시 적용 • 사용하기 쉬운 • 롤러 적용 • 내부/외부",
    description:
      "이 제품들은 다양한 표면에 적용이 가능하며, 브러시, 롤러, 스프레이와 같은 다양한 방법으로 손쉽게 사용할 수 있습니다. 또한, 이 제품은 몇 분만에 청동 및 구리 녹청의 특별하고 시대를 초월한 외관을 혹은 녹슨 철의 풍화된 효과를 창출해냅니다.",
  },
];

const BrandSlider = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    speed: 1000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
  };

  const brandList = Array.from({ length: 5 }, (_, i) => ({
    id: `brand${i + 1}`,
    img: `/brand/modernmasters-img/modernmasters-brand_${i + 1}.png`,
  }));

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center mb-6 gap-3 sm:w-auto sm:gap-1">
        {brandList.map((data, index) => (
          <div
            key={data.id}
            className="flex flex-col"
            onClick={() => goToSlide(index)}
          >
            <div className="flex w-[190px] border-[#000000] border-[1px] cursor-pointer sm:w-[100px] sm:h-[100px]">
              <Image
                src={data.img}
                alt={`브랜드${index + 1}`}
                width={190}
                height={190}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-[1300px] h-[420px] mx-auto border border-[#E2E2E2] sm:w-full sm:h-full">
        <Slider ref={sliderRef} {...settings}>
          {slideData.map(slide => (
            <div key={slide.id}>
              <div className="flex h-[420px] sm:flex-col sm:h-full sm:mt-4">
                <div className="flex w-[40%] h-[240px] justify-center my-auto sm:h-full sm:mx-auto">
                  <Image
                    src={slide.imageUrl}
                    alt={`슬라이드${slide.id}`}
                    width={400}
                    height={240}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex w-[60%] flex-col my-auto sm:mx-auto sm:mt-4 sm:w-[80%]">
                  <div className="flex w-full sm:justify-center">
                    <Image
                      src={slide.brandImgUrl}
                      alt={`브랜드${slide.id}`}
                      width={400}
                      height={100}
                      style={{ width: "400px", height: "auto" }}
                    />
                  </div>
                  <div className="flex text-[18px] mt-[45px] mb-[25px] sm:text-[10px] sm:mx-auto">
                    {slide.features}
                  </div>
                  <div className="flex text-[18px] w-[730px] sm:text-[14px] sm:w-full sm:mb-10">
                    {slide.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandSlider;
