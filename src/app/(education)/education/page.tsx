import TopBanner from "@/app/(education)/education/TopBanner";
import RouteComplete from "@/utils/RouteComplete";
import EducationCard from "@/app/(education)/education/EducationCard";
import EduSection from "@/app/(education)/education/EduSection";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";

export default async function Page() {
  // const edu: Edu[] = await getEdu();
  return (
    <RouteComplete>
      <TopBanner />
      <EduSection />
      <div className={ "flex flex-col justify-center items-center pt-24 pb-14" }>
        <span className={ " text-center text-black text-2xl font-normal font-['EB Garamond'] tracking-widest" }>PACKAGE PROGRAM</span>
        <span className={ "mt-4 text-center text-black text-6xl font-bold font-['Helvetica']" }>패키지 교육 과정</span>
        <span
          className={ "mt-7 w-[851px] text-center text-black text-lg font-normal font-['Helvetica'] leading-[30px]" }>다양한 과정은 패키지로 교육 받으실 수 있습니다. Aplicatior, Master, 그리고<br /> One Day 등 다양한 프로그램이 운영되고 있습니다.</span>
      </div>
      <div className={ "pt-12 bg-neutral-50 border border-neutral-200" }>
        <EducationCard />
      </div>
      <div>
        <div className={ "mt-44 flex flex-col items-center pb-12" }>
          <span className={ "text-center text-black text-2xl font-normal font-['EB Garamond'] tracking-widest mb-5" }>SHORT COURSE</span>
          <span className={ "text-center text-black text-6xl font-bold font-['Helvetica']" }>단과 교육</span>
          <span
            className={ "w-[851px] mt-7 text-center text-black text-lg font-normal font-['Helvetica'] leading-[30px]" }>
            단과 교육은 짧은 기간 동안에도 효과적인 학습을 제공하는 프로그램으로, 명확한 <br />목표를 가지고 집중적으로 학습하고자 하는 분들에게 적합합니다</span>
        </div>
        <div>
          <div className={ 'w-4/6 mx-auto flex items-center justify-center space-x-5 flex-wrap' }>
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
      </div>
    </RouteComplete>
  );
}