import Image from "next/image";
import edubackground from "@/assets/education/eduback.jpg";
import EduDesignCard from "./EduDesignCard";

export default function EduSection() {
  return (
    <>
      <section className={"w-[100vw] h-[830px] relative"}>
        <Image
          src={edubackground}
          fill={true}
          alt="edubackground"
          className={"z-0"}
        />
        <div className={"relative top-52 left-32 flex"}>
          <div className={"flex space-x-9"}>
            <EduDesignCard type="applicator" />
            <EduDesignCard type="master" />
            <EduDesignCard type="oneday" />
          </div>
          <div className={"flex flex-col ml-24"}>
            <span
              className={
                'text-2xl font-normal font-["EB Garamond"] tracking-widest'
              }
            >
              Class Education
            </span>
            <span
              className={
                "mt-4 text-black text-6xl font-bold font-['Helvetica']"
              }
            >
              클래스 교육
            </span>
            <span
              className={
                "mt-7 w-[320px] p-2 bg-black rounded-full text-white text-center text-[33px]"
              }
            >
              3개 클래스 운영
            </span>
            <span
              className={
                'w-4/6 mt-8 text-lg text-black font-light font-["Helvetica"] leading-[30px]'
              }
            >
              샤뜨는 다양한 교육과정을 제공하여 학습자들이 전문 기술을 습득하고
              성장할 수 있도록 지원하고 있습니다. 그 중에서도 주목받는
              교육과정으로는 Aplicatior, Master, One Day 프로그램이 있습니다.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
