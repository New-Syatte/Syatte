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
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Mobile } from "@/hooks/useMediaQuery";

interface Course {
  _id: string;
  category: string;
  name: string;
  startDate: string;
  endDate: string;
  schedule: string;
  fee: string;
}

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
            <Link href={`/education/${course._id}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
                <div className="p-6">
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm mb-4">
                    {categoryMap[course.category as keyof typeof categoryMap]}
                  </span>
                  <h3 className="text-xl font-bold mb-4">{course.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      {format(new Date(course.startDate), "yyyy년 MM월 dd일", {
                        locale: ko,
                      })}{" "}
                      ~{" "}
                      {format(new Date(course.endDate), "yyyy년 MM월 dd일", {
                        locale: ko,
                      })}
                    </p>
                    <p>{course.schedule}</p>
                    <p className="text-primary font-bold">{course.fee}</p>
                  </div>
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
