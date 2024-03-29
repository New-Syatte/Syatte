import Slider from "@/components/slider/Slider";
import Button from "@/components/button/Button";
import Motion from "@/components/motion/Motion";

import Banner1 from "@/assets/main/main-banner.png";
import main1 from "@/assets/main/main-art1.png";
import main2 from "@/assets/main/main-art2.png";
import main3 from "@/assets/main/main-art3.png";
import main4 from "@/assets/main/main-art4.png";
import main5 from "@/assets/main/main-art5.png";
import main6 from "@/assets/main/main-art6.png";
import main7 from "@/assets/main/main-art7.png";
import intro1 from "@/assets/main/introduce-img1.png";
import introSub1 from "@/assets/main/introduce-sub1.png";
import introSub2 from "@/assets/main/introduce-sub2.png";
import introSub3 from "@/assets/main/introduce-sub3.png";
import introSub4 from "@/assets/main/introduce-sub4.png";
import introSub5 from "@/assets/main/introduce-sub5.png";
import eduImg from "@/assets/main/main-edu.png";
import bottomBanner from "@/assets/main/bottom-banner.png";

import Image from "next/image";
import Link from "next/link";
import URLS from "@/constants/urls";
import BrandBox from "./BrandBox";
import SectionTitle from "./SectionTitle";

export default async function Home() {
  const datas = [{ imageUrl: Banner1 }];
  const introDatas = [{ imageUrl: intro1 }];
  const introSubArray = [introSub1, introSub2, introSub3, introSub4, introSub5];

  const container = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeIn",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeIn",
      },
    },
  };
  return (
    <>
      <main className="font-kor overflow-x-hidden">
        {/* 메인 배너 */}
        <Motion initial="hidden" whileInView="visible" variants={fadeIn}>
          <div className="w-full h-[890px]">
            <Slider datas={datas} fill={true} arrowSize={54} />
          </div>
        </Motion>
        {/* 메인 */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <SectionTitle type="introduce">
            <div className="w-[85%] h-[550px] overflow-hidden">
              <div className="flex items-end justify-center gap-[12px]">
                <div className="w-[338px] h-full flex flex-col gap-[14px]">
                  <div className="w-[338px] h-[243px]"></div>
                  <div className="w-[338px] h-[281px] relative">
                    <Image src={main4} fill={true} alt="main4" />
                  </div>
                </div>
                <div className="w-[516px] h-full flex flex-col gap-[14px]">
                  <div className="w-[516px] h-[306px] relative">
                    <Image src={main1} fill={true} alt="main1" />
                  </div>
                  <div className="w-[514px] h-[216px] relative">
                    <Image src={main5} fill={true} alt="main5" />
                  </div>
                </div>
                <div className="w-[409px] h-full flex flex-col gap-[14px]">
                  <div className="w-[409px] h-[243px] relative">
                    <Image src={main2} fill={true} alt="main2" />
                  </div>
                  <div className="w-[409px] h-[281px] relative">
                    <Image src={main6} fill={true} alt="main6" />
                  </div>
                </div>
                <div className="w-[338px] h-full flex flex-col gap-[14px]">
                  <div className="w-[221px] h-[142px] relative">
                    <Image src={main3} fill={true} alt="main3" />
                  </div>
                  <div className="w-[338px] h-[216px] relative">
                    <Image src={main7} fill={true} alt="main7" />
                  </div>
                </div>
              </div>
            </div>
          </SectionTitle>
        </Motion>
        {/* *****************회사소개***************** */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <SectionTitle type="syatte">
            <div className="w-full h-[624px] bg-[#f9f6f3] flex">
              <div className="w-1/2 h-full">
                <Slider datas={introDatas} fill={true} arrowSize={44} />
              </div>
              <div className="p-14 pl-24 w-1/2 h-full">
                <p className="font-garamond font-normal text-xl pl-2 mb-5 tracking-[2px]">
                  SYATT
                </p>
                <h2 className="text-[50px] font-bold mb-11 whitespace-break-spaces">
                  샤뜨
                </h2>
                <p className="text-lg mb-16">
                  주식회사 샤뜨는 외단열 시스템의 현장 적용과 시공 감리를
                  체계적으로 진행하여 에너지 손실을 최소화하고 외단열 현장의
                  다양한 고객 요구를 충족시키기 위해 도전을 계속하고 있습니다.
                  또한, 시간이 흐를수록 지속적인 따뜻함과 애착을 주는 나만의
                  포페인팅(Faux-Painting) 경험을 제공하고 교육하는 전문
                  업체입니다. 시대의 흐름과 사람들이 공감하며 자연스러운
                  아름다움을 느낄 수 있는 디자인을 추구하면서도, 오랜 경험과
                  샤뜨만의 노하우를 통해 여러분의 공간에 생기를 불어넣겠습니다.
                </p>
                <div className="flex gap-[15px] p-auto">
                  {introSubArray.map((data, index) => (
                    <Image
                      key={index}
                      src={data}
                      width={97}
                      height={68}
                      alt="introSub"
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionTitle>
        </Motion>
        {/* *****************모던마스터즈 & 마이더스메탈소개***************** */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <SectionTitle type="brand">
            <BrandBox brand="modernMasters" />
            <BrandBox brand="midasMetal" />
          </SectionTitle>
        </Motion>
        {/* 교육소개 */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <SectionTitle type="education">
            <div className="w-[85%] h-[630px] flex bg-black">
              <div className="h-full w-[62%] relative">
                <Image src={eduImg} alt="eduImg" fill={true} />
              </div>
              <div className="w-[38%] h-full pr-14 pl-24 py-28 text-white">
                <p className="font-garamond font-normal text-lg pl-1 mb-4 tracking-[2px]">
                  RESERVATION
                </p>
                <h2 className="text-[50px] font-bold mb-11 whitespace-break-spaces">
                  교육 예약
                </h2>
                <p className="text-lg mb-16">
                  샤뜨의 포페인팅 교육은 창의성을 끌어올리고 예술적 기술을
                  향상하고자 하는 분들을 위한 특별한 기회입니다. 전문 강사들이
                  안내하는 고품질의 교육 환경에서 참가자들은 나만의 독특한
                  포페인팅 기술을 습득하며, 예술적인 성장을 경험할 수 있습니다.
                  지금 예약하고 샤뜨의 예술적 여정에 참여하세요.
                </p>
                <Button
                  style="w-[166px] h-[50px] border-white border text-white"
                  styleType="blank"
                >
                  <Link href={URLS.EDUCATION}>예약하기</Link>
                </Button>
              </div>
            </div>
          </SectionTitle>
        </Motion>
        {/* 하단 배너 */}
        <div className="w-full h-[430px] relative bg-black flex justify-center items-center">
          <Image
            src={bottomBanner}
            fill={true}
            alt="bottomBanner"
            className="opacity-50"
          />
          <h2 className="z-10 text-3xl font-crimson font-extralight text-white tracking-[12px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            SYATT
          </h2>
        </div>
      </main>
    </>
  );
}
