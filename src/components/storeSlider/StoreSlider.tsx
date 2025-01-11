/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/type/products";
import URLS from "@/constants/urls";
import Card from "@/components/card/Card";

interface DetailCategoryProps {
  products: Product[];
  category: string;
}

const StoreSlider = ({ products, category }: DetailCategoryProps) => {
  const settings = {
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
      return product.mainCategory === category;
    })
    .slice(0, 4);

  return (
    <div className="flex w-[1300px] sm:w-full sm:gap-4 sm:grid sm:grid-cols-2">
      {/* <Slider {...settings}> */}
      {filteredProducts.map((product: Product) => (
        <Card
          key={product._id}
          title={product.productName}
          src={product.mainImage.imageUrl}
          linkTo={`${URLS.PRODUCT_DETAILS}/${product._id}`}
          product={product}
          bgColor={
            product.mainCategory === "midasMetal" ? "[#f4f4f4]" : "white"
          }
        />
      ))}
      {/* </Slider> */}
    </div>
  );
};

export default StoreSlider;
