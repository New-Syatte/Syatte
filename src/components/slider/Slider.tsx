"use client";
import React, { useEffect } from "react";
import Icon from "../icon/Icon";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  nextSlide,
  prevSlide,
  setSliderLength,
  removeSlider,
} from "@/redux/slice/sliderSlice";

interface ISliderProps {
  id: string;
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
  id,
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
  const dispatch = useDispatch();
  const currentSlide =
    useSelector((state: RootState) => state.slider[id]?.currentSlide) || 0;
  // datas 배열을 slidePerView 값에 따라 분할
  const slides: any[] = [];
  for (let i = 0; i < datas.length; i += slidePerView) {
    slides.push(datas.slice(i, i + slidePerView));
  }

  const handleNextSlide = () => {
    dispatch(nextSlide(id));
  };

  const handlePrevSlide = () => {
    dispatch(prevSlide(id));
  };

  useEffect(() => {
    dispatch(setSliderLength({ id, length: slides.length }));

    return () => {
      dispatch(removeSlider(id));
    };
  }, [dispatch, id, slides.length]);

  const arrowStyle =
    "absolute top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 text-white cursor-pointer hover:bg-white";
  const leftStyle = "right-0 text-colorBlack";
  const rightStyle = "left-0 text-colorBlack";
  console.log(datas.length);

  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-hidden">
      {datas.length !== 1 && (
        <Icon
          type="right"
          className={arrowStyle + " " + leftStyle}
          style={{ width: arrowSize, height: arrowSize }}
          onClick={handlePrevSlide}
        />
      )}
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
          <Image
            key={index}
            className="h-full object-cover"
            src={data.imageUrl}
            alt=""
            width={width}
            height={height}
            fill={fill}
            unoptimized
          />
        </div>
      ))}
      {datas.length !== 1 && (
        <Icon
          type="left"
          className={arrowStyle + " " + rightStyle}
          style={{ width: arrowSize, height: arrowSize }}
          onClick={handleNextSlide}
        />
      )}
    </div>
  );
};

export default Slider;
