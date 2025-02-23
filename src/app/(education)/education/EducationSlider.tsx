/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Course } from "@/type/edu";
import Image from "next/image";
import Button from "@/components/button/Button";

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

const getImageHeight = (classCount: number) => {
  if (classCount === 1) {
    return "h-[312px]";
  }
  return "h-64"; // 모든 이미지 높이 통일
};

// Portable Text에서 텍스트만 추출하는 함수
const extractTextFromPortableText = (blocks: any[] = []): string => {
  return blocks
    ?.map(block => {
      if (block._type === "block") {
        return block.children
          ?.map((child: any) => child.text)
          .filter(Boolean)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
};

const EducationSlider = ({ courses }: EducationSliderProps) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-7xl mx-auto overflow-visible relative">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView="auto"
        centeredSlides={true}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        className="!pb-12 !overflow-visible"
      >
        {courses.map(course => (
          <SwiperSlide
            key={course._id}
            className="!w-[1000px] opacity-40 transition-all duration-300"
          >
            <div className="mb-16 bg-white py-10 px-14 rounded-[20px] border border-lightGray h-[700px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[40px] font-bold">{course.name}</h2>
                {course.classes.length === 1 && (
                  <div className="w-44">
                    <Button
                      style="p-3"
                      onClick={() => router.push(`/education/${course._id}`)}
                    >
                      풀코스 신청하기
                    </Button>
                  </div>
                )}
              </div>
              <div className="text-gray-600 mb-8 max-w-3xl text-lg">
                {extractTextFromPortableText(course.description)}
              </div>

              <div className="flex w-full gap-10">
                {course.classes.map(classItem => (
                  <div key={classItem._id} className="bg-white w-full">
                    <div className={`relative w-full ${getImageHeight(1)}`}>
                      <Image
                        src={classItem.image || "/images/default.webp"}
                        alt={classItem.name}
                        fill
                        className="object-cover rounded-[10px]"
                      />
                    </div>
                    {course.classes.length > 1 && (
                      <div className="flex justify-between items-center mt-4 gap-5">
                        <div className="w-2/3 flex flex-col gap-2">
                          <h3 className="text-2xl font-bold">
                            {classItem.name}
                          </h3>
                          <p className="text-lg">
                            {extractTextFromPortableText(
                              classItem.details,
                            ).slice(0, 50)}
                          </p>
                        </div>
                        <div className="w-1/3 flex items-stretch self-stretch">
                          <Button
                            styleType="secondary"
                            style="flex-1"
                            onClick={() =>
                              router.push(`/education/${course._id}`)
                            }
                          >
                            신청하기
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper {
          overflow: visible !important;
          padding: 20px 0;
        }
        .swiper-slide {
          transition: all 0.3s ease;
        }
        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1.02);
        }
        .swiper-pagination {
          position: relative !important;
          margin-top: -4rem;
        }
        .swiper-pagination-bullet {
          margin: 0 8px !important;
          width: 8px !important;
          height: 8px !important;
          background: #d9d9d9;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #666666;
        }
      `}</style>

      {/* Custom Pagination */}
      <div className="swiper-pagination !bottom-0"></div>
    </div>
  );
};

export default EducationSlider;
