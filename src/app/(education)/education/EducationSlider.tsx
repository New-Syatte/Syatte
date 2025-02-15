/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mobile } from "@/hooks/useMediaQuery";
import { Course } from "@/type/edu";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";

interface EducationSliderProps {
  courses: Course[];
}

const categoryMap = {
  applicator_class: "A/C (Applicator Class)",
  master_class: "M/C (Master Class)",
  plaster_class: "Plaster Class",
  vintage_class: "Vintage Class",
  one_day_class: "One Day Class",
};

const EducationSlider = ({ courses }: EducationSliderProps) => {
  const isMobile = Mobile();

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {courses.map(course => (
          <SwiperSlide key={course._id}>
            <Link
              href={`/education/reserve?courseId=${course._id}`}
              className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 hover:border-primary"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{course.name}</h3>
                <div className="flex flex-col gap-1 text-sm text-gray-500">
                  <p>
                    {formatDate(course.startDate)} ~{" "}
                    {formatDate(course.endDate)}
                  </p>
                  <p>{course.schedule}</p>
                  <p>{formatPrice(course.fee)}원</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EducationSlider;
