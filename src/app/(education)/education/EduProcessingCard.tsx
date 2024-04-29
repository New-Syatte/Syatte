import Image from "next/image";
import Edu01 from "@/assets/education/edu-0.jpg";

export default function EduProcessingCard() {
  return (
    <section className={"w-[150px] sm:w-[255px] mb-6 sm:mb-[60px]"}>
      <div className={"w-full h-auto sm:w-[255px] sm:h-[220px] relative"}>
        <Image
          src={Edu01}
          alt={"교육과정-01"}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className={"flex items-center justify-start"}>
        <span
          className={
            "bg-amber-200 rounded-lg px-2 py-1 flex justify-center items-center mt-4 text-xs text-yellow-600"
          }
        >
          모집중
        </span>
      </div>
      <p
        className={
          "mt-2 sm:mt-[13px] w-full text-black text-xs sm:text-lg font-normal font-helvetica sm:leading-[27px]"
        }
      >
        샤뜨 페인팅 세미나를 진행합니다. 메탈릭 페인트 워크샵 등 ...
      </p>
      <p className={"mt-2 sm:mt-[13px] text-[9px] sm:text-lg text-gray-400"}>
        2023.3.1 ~ 2023.6.28
      </p>
    </section>
  );
}
