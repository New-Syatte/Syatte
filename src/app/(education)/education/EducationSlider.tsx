/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EducationCard from "./EducationCard";
import { Mobile } from "@/hooks/useMediaQuery";

const slideData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

const EducationSlider = () => {
  const isMobile = Mobile();
  const settings = {
    arrows: false,
    dots: true,
    centerMode: true,
    centerPadding: isMobile ? "-10px" : "-20px",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
  };

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className="sm:w-[320px] w-[1163px] h-full edu-slick">
        <Slider {...settings}>
          {slideData.map(slide => (
            <EducationCard key={slide.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default EducationSlider;
