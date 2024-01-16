import Image from "next/image";
import Edu01 from "@/assets/education/edu-0.jpg";

export default function EduProcessingCard() {
  return (
    <section className={'w-[255px] mb-[60px]'}>
      <Image src={Edu01} width={255} height={220} alt={'교육과정-01'}/>
      <p className={ "bg-amber-500 rounded-lg w-[55px] flex justify-center items-center p-1 mt-[15px]" }>모집중</p>
      <p className={'mt-[13px] text-[18px]'}>샤뜨 페인팅 세미나를 진행합니다. 메탈릭 페인트 워크샵 등 ...</p>
      <p className={'mt-[13px] text-[16px]'}>2023.3.1 ~ 2023.6.28</p>
    </section>
  );
}
