"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import Icon from "../icon/Icon";
import Image from "next/image";

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

interface SlidePerViewProperties extends React.CSSProperties {
  "--slide-per-view"?: number;
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
  console.log(datas);
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

  return (
    <div
      className={styles.slider}
      style={{ "--slide-per-view": slidePerView } as SlidePerViewProperties}
    >
      <Icon
        type="left"
        className={`${styles.arrow} ${styles.prev}`}
        style={{ width: arrowSize, height: arrowSize }}
        onClick={prevSlide}
      />
      {/* 현재 슬라이드 그룹의 모든 데이터를 렌더링 */}
      {slides[currentSlide].map((data: any, index: number) => (
        <div
          key={index}
          style={{ width, height }}
          className={styles.slide + " " + bgColor}
          onClick={() => {
            setIndexImage && setIndexImage(index);
          }}
          {...restProps}
        >
          <Image
            key={index}
            src={data.imageUrl}
            alt=""
            width={width}
            height={height}
            fill={fill}
          />
        </div>
      ))}
      <Icon
        type="right"
        className={`${styles.arrow} ${styles.next}`}
        style={{ width: arrowSize, height: arrowSize }}
        onClick={nextSlide}
      />
    </div>
  );
};

export default Slider;
