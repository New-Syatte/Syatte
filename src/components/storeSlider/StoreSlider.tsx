/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductForList } from "@/type/products";
import Image from "next/image";
import Link from "next/link";
import URLS from "@/constants/urls";

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

interface DetailCategoryProps {
  products: ProductForList[];
  category: string;
}

const StoreSlider = ({ products, category }: DetailCategoryProps) => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: true,
    speed: 1000,
    autoplay: true,
  };

  const filteredProducts = products
    .filter((product: any) => {
      if (category === "all") return true;
      return product.category === category;
    })
    .slice(0, 4);

    console.log(filteredProducts)

  return (
    <div className="flex w-[1300px] sm:w-full sm:gap-4 sm:grid sm:grid-cols-2">
      {/* <Slider {...settings}> */}
        {filteredProducts.map(slide => (
          <div key={slide._id} className="flex flex-col w-[330px] h-auto mr-2 sm:w-full sm:mr-0">
            <div className="flex mb-2">
            <Link href={`${URLS.PRODUCT_DETAILS}/${slide._id}`}>
              <div className="flex w-[310px] h-[310px] justify-center border border-[#E2E2E2] bg-white sm:w-[150px] sm:h-[150px]">
                <img src={slide.mainImage.imageUrl} className="flex max-h-[200px] m-auto sm:w-[120px] sm:h-[120px]"/>
              </div>
            </Link>
            </div>
            <div className="flex text-[18px] mt-5">{slide.productName}</div>
            <div className="flex items-end mb-2 sm:flex-col sm:items-start">
              <div className="flex text-[24px] text-[#FF5353] mr-2 sm:text-[14px]">할인%</div>
              <div className="flex text-[18px] text-[#B8B8B8] pb-1 line-through mr-[6px] sm:text-[12px]">
                원가
              </div>
              <div className="flex text-[24px] mr-2 sm:text-[18px]">{slide.price}원</div>
            </div>
            {/* <div className="flex text-[16px] w-[110px] h-[30px] bg-[#000000] text-[#ffffff] justify-center cursor-pointer pt-[1px]">
              카트 담기
            </div> */}
            <article className="flex gap-2 mt-[10px] sm:mt-[0px] sm:mb-[30px]">
              <Image src="/download.svg" alt="toCart" width={15} height={15} />
              <p className="text-center text-neutral-400 text-base font-normal">
                카트 담기
              </p>
            </article>
          </div>
        ))}
      {/* </Slider> */}
    </div>
  );
};

export default StoreSlider;
