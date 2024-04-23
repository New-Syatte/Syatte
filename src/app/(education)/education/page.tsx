import TopBanner from "@/app/(education)/education/TopBanner";
import RouteComplete from "@/utils/RouteComplete";
import EducationSlider from "./EducationSlider";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import Button from "@/components/button/Button";

export default async function Page() {
  // const edu: Edu[] = await getEdu();
  return (
    <RouteComplete>
      <TopBanner />
      <div
        className={
          "flex flex-col justify-center items-center pt-24 pb-44 bg-bgGray"
        }
      >
        <span
          className={
            " text-center text-black text-2xl font-normal font-garamond tracking-widest"
          }
        >
          PACKAGE PROGRAM
        </span>
        <span
          className={
            "mt-4 text-center text-black text-6xl font-black font-NotoSansKR"
          }
        >
          패키지 교육 과정
        </span>
        <span
          className={
            "mt-7 w-[851px] text-center text-black text-lg font-normal font-helvetica leading-[30px] mb-12"
          }
        >
          다양한 과정은 패키지로 교육 받으실 수 있습니다. Aplicatior, Master,
          그리고
          <br /> One Day 등 다양한 프로그램이 운영되고 있습니다.
        </span>
        <EducationSlider />
      </div>

      <div className="flex flex-col justify-center items-center mb-40">
        <div className={"mt-44 flex flex-col items-center pb-12"}>
          <span
            className={
              "text-center text-black text-2xl font-normal font-garamond tracking-widest mb-5"
            }
          >
            SHORT COURSE
          </span>
          <span
            className={
              "text-center text-black text-6xl font-black font-NotoSansKR"
            }
          >
            단과 교육
          </span>
          <span
            className={
              "w-[851px] mt-7 text-center text-black text-lg font-normal font-helvetica leading-[30px]"
            }
          >
            단과 교육은 짧은 기간 동안에도 효과적인 학습을 제공하는
            프로그램으로, 명확한 <br />
            목표를 가지고 집중적으로 학습하고자 하는 분들에게 적합합니다
          </span>
        </div>
        <div className={"pt-12"}>
          <div
            className={
              "w-4/6 mx-auto flex items-center justify-center space-x-5 flex-wrap"
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
    </RouteComplete>
  );
}
