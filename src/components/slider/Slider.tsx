"use client";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "../icon/Icon";
import Image from "next/image";
import SlideImage from "./SlideImage";

interface ISliderProps {
  datas: any[];
  slidePerView?: number;
  width?: number;
  height?: number;
  fill?: boolean; // 이 옵션이 true면 width, height 값이 무시되고 부모 요소의 크기를 따라감
  bgColor?: string;
  arrowSize?: number;
  setIndexImage?: (index: number) => void; // React useState Setter 함수
  [key: string]: any;
}

const Slider = ({
  datas,
  slidePerView = 1,
  width,
  height,
  fill = false,
  arrowSize = 78,
  bgColor = "bg-white",
  setIndexImage,
  ...restProps
}: ISliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // datas 배열을 slidePerView 값에 따라 분할
  const slides: any[] = [];
  for (let i = 0; i < datas.length; i += slidePerView) {
    slides.push(datas.slice(i, i + slidePerView));
  }

  const sliderLength = slides.length;

  const intervalTime = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }, [currentSlide, sliderLength]);

  useEffect(() => {
    const interval = setInterval(nextSlide, intervalTime);
    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  const arrowStyle =
    "absolute top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 text-white cursor-pointer hover:bg-white";
  const leftStyle = "right-0 text-colorBlack";
  const rightStyle = "left-0 text-colorBlack";

  return (
    <div className="w-full h-full relative flex justify-center items-center space-x-4 overflow-hidden">
      <Icon
        type="left"
        className={arrowStyle + " " + leftStyle}
        style={{ width: arrowSize, height: arrowSize }}
        onClick={prevSlide}
      />
      {/* 현재 슬라이드 그룹의 모든 데이터를 렌더링 */}
      {slides[currentSlide].map((data: any, index: number) => (
        <div
          key={index}
          style={{ width, height }}
          className={
            `transition-all duration-500 flex-shrink-0 w-[calc(100%/${slidePerView})]` +
            " " +
            bgColor
          }
          onClick={() => {
            setIndexImage && setIndexImage(index);
          }}
          {...restProps}
        >
          {/* @ts-expect-error Async Server Component */}
          <SlideImage
            data={data}
            index={index}
            width={width}
            height={height}
            fill={fill}
          />
        </div>
      ))}
      <Icon
        type="right"
        className={arrowStyle + " " + rightStyle}
        style={{ width: arrowSize, height: arrowSize }}
        onClick={nextSlide}
      />
    </div>
  );
};

export default Slider;
