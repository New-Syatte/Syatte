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
        "w-[1163px] h-[533px] border-2 shadow-xl rounded-2xl p-12 mb-[82px] bg-white"
      }
    >
      <div className={"flex items-end justify-between pb-6"}>
        <div className={"flex flex-col items-start justify-center"}>
          <span className={"text-black text-[40px] font-bold leading-[68px]"}>
            Aplicatior 교육패키지
          </span>
          <span
            className={
              "w-[676px] text-black text-lg font-normal mt-1 leading-normal"
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
            "py-4 px-8 bg-primaryBlue border-white border-2 text-center text-white text-xl font-bold rounded-md whitespace-nowrap"
          }
        >
          풀코스 신청하기
        </button>
      </div>
      <div
        className={"flex justify-center items-center mt-7 space-x-10 mb-[97px]"}
      >
        {ApplicatiorCards.map(index => (
          <ApplicatorCard key={index} />
        ))}
      </div>
    </div>
  );
}
