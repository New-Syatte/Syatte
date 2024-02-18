import Image from "next/image";
import edubackground from "@/assets/education/eduback.jpg";
import aplicatior from "@/assets/education/aplicator.jpg";
import master from "@/assets/education/master.jpg";
import oneday from "@/assets/education/oneday.jpg";

export default function EduSection() {
  return (
    <>
      <section className={ "w-[100vw] h-[830px] relative" }>
        <Image src={ edubackground } fill={ true } alt="edubackground" className={ "z-0" } />
        <div className={ 'relative top-52 left-32 flex' }>
          <div className={ "flex space-x-9" }>
            <div className={ "flex flex-col w-[276px] shadow-2xl rounded-3xl" }>
              <div className={ "h-[320px] relative rounded-t-3xl border" }>
                <Image src={ aplicatior } fill={ true } alt={ "aplicatior" } className={ "rounded-t-3xl" } />
              </div>
              <div className={ "bg-black-500 bg-black flex flex-col items-center rounded-b-3xl z-10" }>
                <span className={ "mt-6 text-[33px] font-bold text-white" }>Aplicatior</span><br />
                <span className={ "mb-6 text-center text-sm font-normal text-white w-[228px]" }>실무에서 즉시 활용 가능한 역량을 강화 할 수 있습니다.</span>
              </div>
            </div>
            <div className={ "flex flex-col w-[276px] shadow-2xl rounded-3xl" }>
              <div className={ "h-[320px] relative rounded-t-3xl border" }>
                <Image src={ master } fill={ true } alt={ "master" } className={ "rounded-t-3xl" } />
              </div>
              <div className={ "bg-black-500 bg-black flex flex-col items-center rounded-b-3xl z-10" }>
                <span className={ "mt-6 text-[33px] font-bold text-white" }>Master</span><br />
                <span className={ "mb-6 text-center text-sm font-normal text-white w-[210px]" }>분야의 선두 주자로 발전 가능한 리더쉽 강화합니다.</span>
              </div>
            </div>
            <div className={ "flex flex-col w-[276px] shadow-2xl rounded-3xl" }>
              <div className={ "h-[320px] relative rounded-t-3xl border" }>
                <Image src={ oneday } fill={ true } alt={ "oneday" } className={ "rounded-t-3xl" } />
              </div>
              <div className={ "bg-black-500 bg-black flex flex-col items-center rounded-b-3xl z-10" }>
                <span className={ "mt-6 text-[33px] font-bold text-white" }>One Day</span><br />
                <span className={ "mb-6 text-center text-sm font-normal text-white w-[210px]" }>빠르게 필요한 스킬 습득, 업무에 즉시 적용 가능합니다.</span>
              </div>
            </div>
          </div>
          <div className={ 'flex flex-col ml-24' }>
            <span className={ 'text-2xl font-normal font-["EB Garamond"] tracking-widest' }>Class Education</span>
            <span className={ 'mt-4 text-black text-6xl font-bold font-[\'Helvetica\']' }>클래스 교육</span>
            <span
              className={ 'mt-7 w-[320px] p-2 bg-black rounded-full text-white text-center text-[33px]' }>3개 클래스 운영</span>
            <span className={ 'w-4/6 mt-8 text-lg text-black font-light font-["Helvetica"] leading-[30px]' }>샤뜨는 다양한 교육과정을 제공하여 학습자들이 전문 기술을 습득하고 성장할 수 있도록 지원하고 있습니다.
              그 중에서도 주목받는 교육과정으로는 Aplicatior, Master, One Day 프로그램이 있습니다.</span>
          </div>
        </div>
      </section>
    </>
  )
}
