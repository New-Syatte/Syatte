"use client";
import React from "react";
import main1 from "@/assets/main/main-art1.png";
import main2 from "@/assets/main/main-art2.png";
import main3 from "@/assets/main/main-art3.png";
import main4 from "@/assets/main/main-art4.png";
import main5 from "@/assets/main/main-art5.png";
import main6 from "@/assets/main/main-art6.png";
import main7 from "@/assets/main/main-art7.png";
import Image from "next/image";
import { Mobile } from "@/hooks/useMediaQuery";

const MainImagesLayout = () => {
  const isMobile = Mobile();
  if (!isMobile) {
    return (
      <div className="w-[85%] h-[550px] overflow-hidden">
        <div className="flex items-end justify-center gap-[12px]">
          <div className="w-[338px] h-full flex flex-col gap-[14px]">
            <div className="w-[338px] h-[243px]"></div>
            <div className="w-[338px] h-[281px] relative">
              <Image
                src={main4}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 338px"
                alt="main4"
              />
            </div>
          </div>
          <div className="w-[516px] h-full flex flex-col gap-[14px]">
            <div className="w-[516px] h-[306px] relative">
              <Image
                src={main1}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 516px"
                alt="main1"
              />
            </div>
            <div className="w-[514px] h-[216px] relative">
              <Image
                src={main5}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 514px"
                alt="main5"
              />
            </div>
          </div>
          <div className="w-[409px] h-full flex flex-col gap-[14px]">
            <div className="w-[409px] h-[243px] relative">
              <Image
                src={main2}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 409px"
                alt="main2"
              />
            </div>
            <div className="w-[409px] h-[281px] relative">
              <Image
                src={main6}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 409px"
                alt="main6"
              />
            </div>
          </div>
          <div className="w-[338px] h-full flex flex-col gap-[14px]">
            <div className="w-[221px] h-[142px] relative">
              <Image
                src={main3}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 221px"
                alt="main3"
              />
            </div>
            <div className="w-[338px] h-[216px] relative">
              <Image
                src={main7}
                fill={true}
                sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 338px"
                alt="main7"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div className="w-[90%] h-[300px] overflow-hidden">
        <div className="flex flex-col items-end justify-center gap-[12px]">
          <div className="flex w-full gap-2">
            <div className="w-3/5 h-[170px] relative">
              <Image src={main1} fill={true} alt="main1" />
            </div>
            <div className="w-2/5 h-[170px] relative">
              <Image src={main6} fill={true} alt="main6" />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="w-1/2 h-[99px] relative">
              <Image src={main2} fill={true} alt="main2" />
            </div>
            <div className="w-1/2 h-[99px] relative">
              <Image src={main4} fill={true} alt="main4" />
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default MainImagesLayout;
