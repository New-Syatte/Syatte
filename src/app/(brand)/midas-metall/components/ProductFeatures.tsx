"use client";

import Image from "next/image";
import SubTitleBox from "@/components/subTitleBox/SubTitleBox";
import ProductInfoList from "@/components/productInfoList/ProductInfoList";

export default function ProductFeatures() {
  return (
    <div className="flex flex-col w-full h-auto mt-[100px] mb-[240px] relative sm:mb-[150px]">
      <Image
        src="/brand/midasmetall-img/midasmetall-paint2-lg.png"
        alt="하단 페인트 이미지"
        width={350}
        height={350}
        className="absolute top-0 left-[-150px] rotate-[15deg] sm:w-[200px] sm:left-[-120px]"
      />
      <div className="flex justify-center">
        <SubTitleBox engValue={"PRODUCT FEATURES"} korValue={"제품 특징"} />
      </div>
      <div className="flex justify-center gap-3 z-10">
        <ProductInfoList />
      </div>
    </div>
  );
}
