"use client";
import React from "react";
import main1 from "@/assets/main/main-art1.webp";
import main2 from "@/assets/main/main-art2.webp";
import main3 from "@/assets/main/main-art3.webp";
import main4 from "@/assets/main/main-art4.webp";
import main5 from "@/assets/main/main-art5.webp";
import main6 from "@/assets/main/main-art6.webp";
import main7 from "@/assets/main/main-art7.webp";
import Image from "next/image";
import { Mobile } from "@/hooks/useMediaQuery";
import Motion from "@/components/motion/Motion";

const MainImagesLayout = () => {
  const isMobile = Mobile();
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };
  const motionImg1 = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };
  const motionImg2 = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };
  const motionImg3 = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
      },
    },
  };
  const motionImg4 = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.7,
      },
    },
  };
  if (!isMobile) {
    return (
      <Motion initial="hidden" whileInView="visible" variants={container}>
        <div className="w-[85%] h-[550px] overflow-hidden bg mx-auto">
          <div className="flex items-end justify-center gap-[12px]">
            <div className="w-[338px] h-full flex flex-col gap-[14px]">
              <div className="w-[338px] h-[243px]"></div>
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg1}
              >
                <div className="w-[338px] h-[281px] relative">
                  <Image
                    src={main4}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 338px"
                    alt="main4"
                  />
                </div>
              </Motion>
            </div>
            <div className="w-[516px] h-full flex flex-col gap-[14px]">
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg2}
              >
                <div className="w-[516px] h-[306px] relative">
                  <Image
                    src={main1}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 516px"
                    alt="main1"
                  />
                </div>
              </Motion>
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg3}
              >
                <div className="w-[514px] h-[216px] relative">
                  <Image
                    src={main5}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 514px"
                    alt="main5"
                  />
                </div>
              </Motion>
            </div>
            <div className="w-[409px] h-full flex flex-col gap-[14px]">
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg4}
              >
                <div className="w-[409px] h-[243px] relative">
                  <Image
                    src={main2}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 409px"
                    alt="main2"
                  />
                </div>
              </Motion>
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg1}
              >
                <div className="w-[409px] h-[281px] relative">
                  <Image
                    src={main6}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 409px"
                    alt="main6"
                  />
                </div>
              </Motion>
            </div>
            <div className="w-[338px] h-full flex flex-col gap-[14px]">
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg2}
              >
                <div className="w-[221px] h-[142px] relative">
                  <Image
                    src={main3}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 221px"
                    alt="main3"
                  />
                </div>
              </Motion>
              <Motion
                initial="hidden"
                whileInView="visible"
                variants={motionImg3}
              >
                <div className="w-[338px] h-[216px] relative">
                  <Image
                    src={main7}
                    fill={true}
                    sizes="(max-width: 720px) 90vw, (max-width: 1023px) 45vw, 338px"
                    alt="main7"
                  />
                </div>
              </Motion>
            </div>
          </div>
        </div>
      </Motion>
    );
  }
  if (isMobile) {
    return (
      <div className="w-[90%] h-[300px] overflow-hidden">
        <div className="flex flex-col items-end justify-center gap-[12px]">
          <div className="flex w-full gap-2">
            <div className="w-3/5 h-[170px] relative">
              <Image
                src={main1}
                fill={true}
                sizes="(max-width: 768px) 60vw, 40vw"
                alt="main1"
                priority
              />
            </div>
            <div className="w-2/5 h-[170px] relative">
              <Image
                src={main6}
                fill={true}
                sizes="(max-width: 768px) 40vw, 30vw"
                alt="main6"
                priority
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="w-1/2 h-[99px] relative">
              <Image
                src={main2}
                fill={true}
                sizes="(max-width: 768px) 50vw, 35vw"
                alt="main2"
                priority
              />
            </div>
            <div className="w-1/2 h-[99px] relative">
              <Image
                src={main4}
                fill={true}
                sizes="(max-width: 768px) 50vw, 35vw"
                alt="main4"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default MainImagesLayout;
