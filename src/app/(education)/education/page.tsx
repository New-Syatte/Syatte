import TopBanner from "@/app/(education)/education/TopBanner";

import EducationSlider from "./EducationSlider";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import Button from "@/components/button/Button";

export default async function Page() {
  // const edu: Edu[] = await getEdu();
  return (
    <main className="font-kor overflow-x-hidden">
      <TopBanner />
      <div
        className={
          "w-full h-[1140px] sm:h-full flex flex-col justify-center items-center pt-24 bg-bgGray"
        }
      >
        <span
          className={
            "text-center text-black text-2xl sm:text-base font-normal font-garamond tracking-widest sm:tracking-normal"
          }
        >
          PACKAGE PROGRAM
        </span>
        <span
          className={
            "mt-4 sm:mt-1 text-center text-black text-6xl sm:text-3xl font-black font-NotoSansKR"
          }
        >
          패키지 교육 과정
        </span>
        <span
          className={
            "mt-7 w-[851px] sm:w-[84%] text-center text-black text-lg sm:text-sm font-normal font-helvetica leading-[30px] sm:leading-normal mb-12"
          }
        >
          다양한 과정은 패키지로 교육 받으실 수 있습니다. Aplicatior, Master,
          그리고
          <br /> One Day 등 다양한 프로그램이 운영되고 있습니다.
        </span>
        <EducationSlider />
      </div>

      <div className="w-full flex flex-col justify-center items-center mb-40">
        <div className={"w-[90%] mt-44 flex flex-col items-center pb-12"}>
          <span
            className={
              "text-center text-black text-2xl sm:text-base font-normal font-garamond tracking-widest sm:mb-1 mb-5"
            }
          >
            SHORT COURSE
          </span>
          <span
            className={
              "text-center text-black sm:text-3xl text-6xl font-black font-NotoSansKR"
            }
          >
            단과 교육
          </span>
          <span
            className={
              "w-[851px] sm:w-auto mt-7 text-center text-black sm:text-sm text-lg font-normal font-helvetica sm:leading-normal leading-[30px]"
            }
          >
            단과 교육은 짧은 기간 동안에도 효과적인 학습을 제공하는
            프로그램으로, 명확한 목표를 가지고 집중적으로 학습하고자 하는
            분들에게 적합합니다
          </span>
        </div>
        <div className={"pt-12"}>
          <div
            className={
              "sm:w-[90%] w-4/6 mx-auto flex items-center justify-center gap-4 sm:space-x-0 space-x-5 flex-wrap"
            }
          >
            <EduProcessingCard />
            <EduProcessingCard />
            <EduProcessingCard />
            <EduProcessingCard />
            <EduProcessingCard />
            <EduProcessingCard />
            <EduProcessingCard />
            <EduProcessingCard />
          </div>
        </div>
        <Button
          styleType="blank"
          style="w-40 h-12 py-2 px-4 text-primaryBlue border border-primaryBlue rounded-full hover:bg-primaryBlue hover:text-white transition-all duration-300 ease-in-out"
        >
          더 보기
        </Button>
      </div>
    </main>
  );
}
