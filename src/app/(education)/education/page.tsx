import TopBanner from "@/app/(education)/education/TopBanner";
import EduProcessing from "@/app/(education)/education/EduProcessing";
import { getEdu } from "@/services/sanity/education";
import RouteComplete from "@/utils/RouteComplete";
import { Edu } from "@/model/edu";
import EducationCard from "@/app/(education)/education/EducationCard";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";

export default async function Page() {
  const edu: Edu[] = await getEdu();
  // console.log(edu[0].eduName);
  // console.log(edu[0].eduDescription);
  console.log(edu[0]);
  return (
    <RouteComplete>
      <div>
        <TopBanner />
      </div>
      <section className={ "w-[1308px] mx-auto mt-[81px]" }>
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
          {/*// sanity data map*/ }
          <EduProcessingCard />
          <EduProcessingCard />
          <EduProcessingCard />
          <EduProcessingCard />
          <EduProcessingCard />
        </div>
      </section>
      {/*<EduProcessing />*/ }
    </RouteComplete>
  );
}
