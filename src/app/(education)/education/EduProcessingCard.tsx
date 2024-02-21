import Image from "next/image";
import Edu01 from "@/assets/education/edu-0.jpg";

export default function EduProcessingCard() {
  return (
    <section className={ "w-[255px] mb-[60px]" }>
      <div className={ "w-[255px] h-[220px] relative" }>
        <Image src={ Edu01 } alt={ "교육과정-01" } fill={ true } />
      </div>
      <div className={'flex items-center justify-start'}>
        <span className={ "bg-amber-200 rounded-lg px-2 py-1 flex justify-center items-center mt-4 text-xs text-yellow-600" }>모집중</span>
      </div>
      <p className={ "mt-[13px] w-[255px] text-black text-lg font-normal font-['Helvetica'] uppercase leading-[27px]" }>샤뜨 페인팅 세미나를 진행합니다. 메탈릭 페인트 워크샵 등 ...</p>
      <p className={ "mt-[13px] text-lg text-gray-400" }>2023.3.1 ~ 2023.6.28</p>
    </section>
  );
}
