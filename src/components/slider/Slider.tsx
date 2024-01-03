import React, { useCallback, useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import Icon from "../icon/Icon";
import Image from "next/image";

interface ISliderProps {
  datas: any[];
  slidePerView?: number;
  width?: number;
  height?: number;
  bgColor?: string;
  [key: string]: any;
}

interface SlidePerViewProperties extends React.CSSProperties {
  "--slide-per-view"?: number;
}

const Slider = ({
  datas,
  slidePerView = 1,
  width = 212,
  height = 212,
  bgColor = "bg-white",
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

  return (
    <div
      className={styles.slider}
      style={{ "--slide-per-view": slidePerView } as SlidePerViewProperties}
    >
      <Icon
        type="left"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      />
      {/* 현재 슬라이드 그룹의 모든 데이터를 렌더링 */}
      {slides[currentSlide].map((data: any, index: number) => (
        <div
          key={index}
          style={{ width, height }}
          className={styles.slide + " " + bgColor}
        >
          <Image src={data.imageUrl} alt="" width={width} height={height} />
        </div>
      ))}
      <Icon
        type="right"
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      />
    </div>
  );
};

export default Slider;
