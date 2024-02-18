import Image from "next/image";
import Banner from "@/assets/education/edubanner.jpg";
// import TopBannerImage02 from "@/assets/education/topbanner-02.jpg";
// import TopBannerImage01 from "@/assets/education/topbanner-01.jpg";

export default function TopBanner() {
  return (
    <section>
      <div className=" flex  justify-between w-[1920px] h-[420px] bg-gray-200 border-b border-neutral-200">
        <div className={ "ml-[141px] mt-[93px]" }>
          <div>
            <p className={ "text-xl font-['EB\nGaramond']\n tracking-widest" }>ACADEMY INFO</p>
            <p className={ "mt-[14px] text-6xl font-bold" }>교육 소개</p>
          </div>
          <div className="w-[529px] mt-[30px] text-black text-lg font-light font-['Helvetica'] leading-[30px]">
            <p>창의적이고 특수한 기술을
              활용하여 미술 작품이나 프로젝트를 창조하고자 하는 이들을 위한 훌륭한 기회를 제공합니다.
              다양한 기법과 재료를 활용하여 특수한 효과와 아름다움을 창출하는 데 필요한 기술을 습득하고, 창의적인
              작업을 펼칠 수 있습니다.</p>
          </div>
        </div>
        <div>
          <Image src={ Banner } alt={ "교육배너" } width={ 878 } height={ 420 } />
        </div>
      </div>
    </section>
  )
    ;
}
