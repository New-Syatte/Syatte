import EduDesignCard from "./EduDesignCard";

export default function TopBanner() {
  return (
    <>
      <section>
        <div className=" flex justify-evenly items-center w-[1920px] mb-24 p-36 flex-wrap gap-11">
          <div className={" w-[529px] mt-[93px] flex-shrink-0"}>
            <div>
              <p className={"text-xl font-garamond tracking-widest text-black"}>
                EDUCATION
              </p>
              <p
                className={
                  "mt-[14px] text-6xl font-black text-black font-NotoSansKR"
                }
              >
                교육 소개
              </p>
            </div>
            <div className="mt-[30px] mb-14 text-black text-lg font-light leading-[30px]">
              <p>
                창의적이고 특수한 기술을 활용하여 미술 작품이나 프로젝트를
                창조하고자 하는 이들을 위한 훌륭한 기회를 제공합니다. 다양한
                기법과 재료를 활용하여 특수한 효과와 아름다움을 창출하는 데
                필요한 기술을 습득하고, 창의적인 작업을 펼칠 수 있습니다.
              </p>
            </div>
            <div className={"flex flex-col flex-wrap w-[529px] gap-4"}>
              <span
                className={"mt-6 w-[320px] text-black text-[34px] font-bold"}
              >
                3개 클래스 운영
              </span>
              <span className={"text-lg text-black font-light leading-[30px]"}>
                샤뜨는 다양한 교육과정을 제공하여 학습자들이 전문 기술을
                습득하고 성장할 수 있도록 지원하고 있습니다. 그 중에서도
                주목받는 교육과정으로는 Aplicatior, Master, One Day 프로그램이
                있습니다.
              </span>
            </div>
          </div>
          <div className={"flex space-x-9 justify-center items-center"}>
            <EduDesignCard type="aplicatior" />
            <EduDesignCard type="master" />
            <EduDesignCard type="oneday" />
          </div>
        </div>
      </section>
    </>
  );
}
