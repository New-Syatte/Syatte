"use client";

import ApplicatorCard from "./ApplicatorCard";

export default function EducationCard() {
  const handleClick = () => {
    alert("신청하기 버튼 클릭");
  };

  const ApplicatiorCards = [1, 2, 3, 4];

  return (
    <div
      className={
        "w-[1163px] sm:w-[320px] h-[533px] sm:h-auto border-2 shadow-xl rounded-2xl sm:p-6 p-12 mb-[82px] bg-white"
      }
    >
      <div
        className={
          "flex sm:flex-col sm:items-center sm:justify-center items-end justify-between pt-4"
        }
      >
        <div
          className={
            "flex flex-col sm:items-center sm:justify-center items-start justify-center"
          }
        >
          <span
            className={
              "text-black sm:text-xl text-[40px] font-bold sm:leading-normal leading-[68px]"
            }
          >
            Aplicatior 교육패키지
          </span>
          <span
            className={
              "w-[676px] sm:w-auto text-black sm:text-xs text-lg font-normal mt-1 leading-normal"
            }
          >
            실무 중심의 강력한 역량 강화를 위한 프로그램으로, 업계 수요를 반영한
            커리큘럼과 현장 경험 중심의 실습을 통해 실질적인 스킬을 효과적으로
            습득할 수 있습니다.
          </span>
        </div>
        <button
          onClick={handleClick}
          className={
            "sm:my-4 my-0 sm:py-2 sm:px-4 py-4 px-8 bg-primaryBlue border-white border-2 text-center text-white sm:text-sm text-xl font-bold rounded-md whitespace-nowrap"
          }
        >
          풀코스 신청하기
        </button>
      </div>
      <div
        className={
          "flex sm:flex-wrap flex-nowrap justify-center items-center sm:mt-4 mt-7 gap-3 sm:space-x-0 space-x-10 sm:mb-0 mb-[97px]"
        }
      >
        {ApplicatiorCards.map(index => (
          <ApplicatorCard key={index} />
        ))}
      </div>
    </div>
  );
}
