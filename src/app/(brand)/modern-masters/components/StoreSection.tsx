"use client";

import Image from "next/image";
import SubTitleBox from "@/components/subTitleBox/SubTitleBox";
import StoreSlider from "@/components/storeSlider/StoreSlider";

interface StoreSectionProps {
  products: any[];
}

export default function StoreSection({ products }: StoreSectionProps) {
  const categorys = [
    {
      title: "모던 마스터즈",
      value: "modernMasters",
    },
  ];

  const categoryValues = categorys.map(category => category.value);

  return (
    <div className="flex flex-col h-full w-full justify-center mt-[150px] mb-[240px] relative overflow-hidden sm:mb-[150px]">
      <Image
        src="/brand/modernmasters-img/modernmasters-store_right.png"
        alt="페인트통2"
        width={500}
        height={500}
        className="absolute bottom-0 right-[-200px] transform rotate-[-15deg] sm:w-[200px] sm:right-[-100px]"
      />
      <Image
        src="/brand/modernmasters-img/modernmasters-store_left.png"
        alt="페인트통3"
        width={380}
        height={380}
        className="absolute top-0 left-[-160px] transform rotate-[15deg] sm:w-[200px] sm:left-[-90px] sm:top-[100px]"
      />
      <div className="flex justify-center mb-[50px]">
        <SubTitleBox engValue={"STORE"} korValue={"공식 스토어"} />
      </div>
      {/* 스토어 영역 */}
      <section className="flex w-full justify-center mb-[50px] z-10 sm:w-full">
        {categoryValues.map((category: string, index: number) => (
          <div key={index}>
            <StoreSlider
              key={category}
              products={products}
              category={category}
            />
          </div>
        ))}
      </section>
      <div className="flex w-full justify-center">
        <div className="flex w-[170px] h-[50px] bg-[#000000] text-[#ffffff] justify-center items-center mt-[100px] pb-1 cursor-pointer sm:mt-[30px]">
          스토어 이동
        </div>
      </div>
    </div>
  );
}
