"use client";

import Image from "next/image";
import SubTitleBox from "@/components/subTitleBox/SubTitleBox";
import ProductCards from "@/app/(product)/store/ProductCards";
import Link from "next/link";
import URLS from "@/constants/urls";
import { Product } from "@/type/products";

interface StoreSectionProps {
  products: any[];
}

export default function StoreSection({ products }: StoreSectionProps) {
  const categorys = [
    {
      title: "마이다스 메탈",
      value: "midasMetal",
    },
  ];

  const categoryValues = categorys.map(category => category.value);

  return (
    <div className="flex flex-col h-full w-full justify-center mt-[150px] mb-[240px] relative overflow-hidden">
      <Image
        src="/brand/midasmetall-img/midasmetall-paint3-lg.png"
        alt="왼쪽 페인트 이미지"
        width={500}
        height={500}
        className="absolute bottom-0 right-[-300px] transform rotate-[-15deg] sm:w-[200px] sm:right-[-100px]"
      />
      <Image
        src="/brand/midasmetall-img/midasmetall-paint4-lg.png"
        alt="오른쪽 페인트 이미지"
        width={380}
        height={380}
        className="absolute top-0 left-[-230px] transform rotate-[15deg] sm:w-[200px] sm:left-[-120px]"
      />
      <div className="flex justify-center mb-[50px]">
        <SubTitleBox engValue={"STORE"} korValue={"공식 스토어"} />
      </div>
      {/* 스토어 영역 */}

      <section className="flex sm:w-full flex-col gap-[73px] justify-center items-center">
        {categoryValues.map((category: string, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center sm:w-[90%]"
          >
            <div className="flex w-full justify-between sm:flex-col sm:items-center items-end mb-12 sm:font-GmarketSans"></div>
            <ProductCards
              key={category}
              products={products.filter(
                (product: Product) => product.mainCategory === category,
              )}
            />
            <Link
              href={`${URLS.PRODUCT_STORE_BRAND}/${category}`}
              className="flex w-[170px] h-[50px] bg-[#000000] text-[#ffffff] justify-center items-center mt-[100px] pb-1 cursor-pointer sm:mt-[30px]"
            >
              스토어 이동
            </Link>
          </div>
        ))}
      </section>
      <div className="flex w-full justify-center"></div>
    </div>
  );
}
