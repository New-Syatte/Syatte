"use client";
import React from "react";

import Slider from "@/components/slider/Slider";
import SliderPreview from "@/components/slider/SliderPreview";
import { StaticImageData } from "next/image";
import { Mobile } from "@/hooks/useMediaQuery";

interface IntroSliderProps {
  introDatas: { imageUrl: StaticImageData }[];
  children: React.ReactNode;
}

const IntroduceSlider = ({ introDatas, children }: IntroSliderProps) => {
  const isMobile = Mobile();

  if (!isMobile)
    return (
      <div className="w-full h-[624px] bg-white flex">
        <div className="w-1/2 h-full">
          <Slider
            id="introduce-syatt"
            datas={introDatas}
            fill={true}
            arrowSize={44}
          />
        </div>
        <div className="p-14 pl-24 w-1/2 h-full">
          {children}
          <div className="flex w-1/6 h-auto gap-[15px] p-auto">
            {introDatas.map((data, index) => (
              <SliderPreview
                key={index}
                index={index}
                id="introduce-syatt"
                imgUrl={data.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    );

  if (isMobile)
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full h-[296px]">
          <Slider
            id="introduce-syatt"
            datas={introDatas}
            fill={true}
            arrowSize={44}
          />
        </div>
        <div className="flex flex-col justify-center items-start w-[90%] h-full">
          <div className="flex w-[19%] h-auto gap-2 pt-6 mb-6">
            {introDatas.map((data, index) => (
              <SliderPreview
                key={index}
                index={index}
                id="introduce-syatt"
                imgUrl={data.imageUrl}
              />
            ))}
          </div>
          {children}
        </div>
      </div>
    );
  else return null;
};

export default IntroduceSlider;
