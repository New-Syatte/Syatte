"use client";

import Image from "next/image";
import topbanner1 from "@/assets/education/topbanner-01.jpg";

export default function EducationCard() {
  
  const handleClick = () => {
    alert("신청하기 버튼 클릭");
  };
  
  return (
    <div className={ "w-4/6 border-2 mx-auto shadow-xl rounded-2xl mb-[82px]" }>
      <div className={ "flex items-center pt-7 px-14 space-x-44 bg-black rounded-t-2xl pb-10" }>
        <div className={ "flex flex-col items-start justify-center" }>
          <span
            className={ "text-white text-[40px] font-bold font-['Helvetica'] leading-[68px]" }>Aplicatior 교육패키지</span>
          <span className={ "w-[676px] text-white text-lg font-normal font-['Helvetica'] mt-1 leading-normal" }>실무 중심의 강력한 역량 강화를 위한 프로그램으로, 업계 수요를 반영한 커리큘럼과 현장 경험 중심의 실습을 통해 실질적인
          스킬을 효과적으로 습득할 수 있습니다.</span>
        </div>
        <button
          onClick={ handleClick }
          className={ "px-6 py-3 bg-blue-500 border-white border-2 text-center text-white text-2xl font-bold font-['Helvetica'] rounded-md" }>
          코스 신청하기
        </button>
      </div>
      <div className={ "flex justify-center items-center mt-7 space-x-10 mb-[97px]" }>
        <div className={ "flex flex-col justify-center items-start" }>
          <div className={ "w-60 h-56 relative" }>
            <Image src={ topbanner1 } alt={ "topbanner-01" } fill={ true } className={ "rounded-md" } />
          </div>
          <div>
          <span className={ "text-black text-md font-normal font-['Helvetica'] uppercase leading-[27px]" }>
            1.샤뜨 페인팅 세미나를 진행합니다.<br />메탈릭페인트 워크샵 등..</span>
          </div>
        </div>
        <div className={ "flex flex-col justify-center items-start" }>
          <div className={ "w-60 h-56 relative" }>
            <Image src={ topbanner1 } alt={ "topbanner-01" } fill={ true } className={ "rounded-md" } />
          </div>
          <div>
          <span className={ "text-black text-md font-normal font-['Helvetica'] uppercase leading-[27px]" }>
            샤뜨 페인팅 세미나를 진행합니다.<br />메탈릭페인트 워크샵 등..</span>
          </div>
        </div>
        <div className={ "flex flex-col justify-center items-start" }>
          <div className={ "w-60 h-56 relative" }>
            <Image src={ topbanner1 } alt={ "topbanner-01" } fill={ true } className={ "rounded-md" } />
          </div>
          <div>
          <span className={ "text-black text-md font-normal font-['Helvetica'] uppercase leading-[27px]" }>
            샤뜨 페인팅 세미나를 진행합니다.<br />메탈릭페인트 워크샵 등..</span>
          </div>
        </div>
        <div className={ "flex flex-col justify-center items-start" }>
          <div className={ "w-60 h-56 relative" }>
            <Image src={ topbanner1 } alt={ "topbanner-01" } fill={ true } className={ "rounded-md" } />
          </div>
          <div>
          <span className={ "text-black text-md font-normal font-['Helvetica'] uppercase leading-[27px]" }>
            샤뜨 페인팅 세미나를 진행합니다.<br />메탈릭페인트 워크샵 등..</span>
          </div>
        </div>
      </div>
    </div>
  )
    ;
}