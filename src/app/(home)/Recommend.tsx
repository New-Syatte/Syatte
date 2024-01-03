"use client";
import Slider from "@/components/slider/Slider";

export default function Recommend() {
  let sliderDatas = [];

  for (let index = 0; index < 18; index++) {
    const data = {
      imageUrl: `/main/main-product${index + 1}.png`,
      heading: `상품${index + 1}`,
    };
    sliderDatas.push(data);
  }

  return (
    <div className="w-full h-[600px] bg-white flex justify-end">
      <div className="w-[1600px] h-full flex items-center relative">
        <div className="flex flex-col mr-[80px] mb-[140px]">
          <div className="w-[69px] h-[8px] bg-black mb-3"></div>
          <div className="text-[28px]">
            COLUMBIA
            <br />
            TOOLS
            <br />
            추천 상품
          </div>
        </div>
        <div className="w-[1210px]">
          <Slider
            datas={sliderDatas}
            slidePerView={4}
            bgColor={"bg-lightGray"}
          />
        </div>
      </div>
    </div>
  );
}
