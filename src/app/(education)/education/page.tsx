import TopBanner from "@/app/(education)/education/TopBanner";
import EduProcessing from "@/app/(education)/education/EduProcessing";
import { getEdu } from "@/services/sanity/education";
import RouteComplete from "@/utils/RouteComplete";
import { Edu } from "@/model/edu";
import EducationCard from "@/app/(education)/education/EducationCard";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import aplicatior from "@/assets/education/aplicator.jpg";
import master from "@/assets/education/master.jpg";
import oneday from "@/assets/education/oneday.jpg";
import Image from "next/image";

export default async function Page() {
  const edu: Edu[] = await getEdu();
  return (
    <RouteComplete>
      <TopBanner />
      <section className={ "w-full h-[829px] flex " }>
        <div className={'flex'}>
          <div
            className={ "flex flex-col mr-[40px] ml-[140px] mt-[218px] w-[276px] h-[319px] border-2 border-neutral-200 rounded-tl-2xl rounded-tr-2xl shadow-2xl" }>
            <Image src={ aplicatior } alt={ "Aplicatior" } width={ 276 } height={ 320 } />
            <div className={ "flex flex-col items-center w-[276px] h-[150px] bg-black rounded-bl-2xl rounded-br-2xl" }>
              <p
                className="text-white text-[33.94px] font-bold font-['Gmarket Sans'] mt-[25px] mb-[19px]">Aplicatior</p>
              <p
                className="w-[200px] text-white text-sm font-normal font-['Helvetica'] uppercase leading-tight ">
                실무에서 즉시 활용 가능한 역량을
              </p>
              <p
                className={ "mb-[29px] text-white text-sm font-normal font-['Helvetica'] uppercase leading-tight " }>강화할
                수 있습니다.</p>
            </div>
          </div>
          <div
            className={ "flex flex-col ml-[140px] mt-[218px] w-[276px] h-[319px] border-2 border-neutral-200 rounded-tl-2xl rounded-tr-2xl shadow-2xl" }>
            <Image src={ master } alt={ "Master" } width={ 276 } height={ 320 } />
            <div className={ "flex flex-col items-center w-[276px] h-[150px] bg-black rounded-bl-2xl rounded-br-2xl" }>
              <p
                className="text-white text-[33.94px] font-bold font-['Gmarket Sans'] mt-[25px] mb-[19px]">Aplicatior</p>
              <p
                className="w-[200px] text-white text-sm font-normal font-['Helvetica'] uppercase leading-tight ">
                실무에서 즉시 활용 가능한 역량을
              </p>
              <p
                className={ "mb-[29px] text-white text-sm font-normal font-['Helvetica'] uppercase leading-tight " }>강화할
                수 있습니다.</p>
            </div>
          </div>
          <div
            className={ "flex flex-col ml-[140px] mt-[218px] w-[276px] h-[319px] border-2 border-neutral-200 rounded-tl-2xl rounded-tr-2xl shadow-2xl" }>
            <Image src={ oneday } alt={ "oneday" } width={ 276 } height={ 320 } />
            <div className={ "flex flex-col items-center w-[276px] h-[150px] bg-black rounded-bl-2xl rounded-br-2xl" }>
              <p
                className="text-white text-[33.94px] font-bold font-['Gmarket Sans'] mt-[25px] mb-[19px]">Aplicatior</p>
              <p
                className="w-[200px] text-white text-sm font-normal font-['Helvetica'] uppercase leading-tight ">
                실무에서 즉시 활용 가능한 역량을
              </p>
              <p
                className={ "mb-[29px] text-white text-sm font-normal font-['Helvetica'] uppercase leading-tight " }>강화할
                수 있습니다.</p>
            </div>
          </div>
        </div>
      
      </section>
      
      
      {/*<section className={ "w-[1308px] mx-auto mt-[81px]" }>
        <div>
          <p className={ "text-[24px]" }>EDUCATION INFO</p>
          <p className={ "text-[60px] font-bold" }>교육 소개</p>
        </div>
        <div className={ "flex flex-wrap gap-[24px] mb-[205px]" }>
          { edu.map((item: Edu) => (
            <div key={ item._id }>
              <EducationCard eduName={ item.eduName } eduDescription={ item.eduDescription } />
            </div>
          )) }
        </div>
      </section>
      <div className={ "" } />
      <section className={ "mx-auto w-[70vw] " }>
        <p className={ "text-[60px] font-bold text-center" }>진행중인 교육</p>
        <div className={ "divider mt-[116px]" } />
        <div className={ "mt-[48px]" } />
        <div className={ "flex justify-center flex-wrap w-[1200px] gap-[34px]" }>
          <EduProcessingCard />
          <EduProcessingCard />
          <EduProcessingCard />
          <EduProcessingCard />
          <EduProcessingCard />
        </div>
      </section>*/ }
      {/*<EduProcessing />*/ }
    </RouteComplete>
  );
}
