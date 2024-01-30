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
    title: "텍스처 이펙트",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_1.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 2,
    title: "미장용 흙손",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_2.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 3,
    title: "플래티넘 시리즈 착색제",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_3.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 4,
    title: "페인팅 브러쉬",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_4.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 5,
    title: "텍스처 이펙트",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_1.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 6,
    title: "미장용 흙손",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_2.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 7,
    title: "플래티넘 시리즈 착색제",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_3.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
  {
    id: 8,
    title: "페인팅 브러쉬",
    imageUrl: "/brand/modernmasters-img/modernmasters-store_4.png",
    category: "모던마스터즈",
    price: 50000,
    discount: 25,
    description: "모던마스터즈 페인트 설명",
  },
];

const StoreSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: true,
    speed: 1000,
  };

  return (
    <div className="w-[1300px]">
      <Slider {...settings}>
        {slideData.map(slide => (
          <div key={slide.id} className="flex w-[330px] h-auto mr-2">
            <div className="flex mb-2">
              <div className="flex w-[310px] h-[310px] justify-center border border-[#E2E2E2]">
                <img src={slide.imageUrl} />
              </div>
            </div>
            <div className="flex text-[18px] mt-5">{slide.title}</div>
            <div className="flex items-end mb-2">
              <div className="flex text-[24px] text-[#FF5353] mr-2">
                {slide.discount}%
              </div>
              <div className="flex text-[24px] mr-2">{slide.price}원 ~</div>
              <div className="flex text-[18px] text-[#B8B8B8] pb-1">
                37,500원
              </div>
            </div>
            <div className="flex text-[16px] w-[110px] h-[30px] bg-[#000000] text-[#ffffff] justify-center cursor-pointer pt-[1px]">
              카트 담기
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StoreSlider;
