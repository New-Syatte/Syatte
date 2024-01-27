import RouteComplete from "@/utils/RouteComplete";
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
import MMLogo from "@/assets/modern-masters-logo.png";
import bottomBanner from "@/assets/main/bottom-banner.png";

import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

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
    <RouteComplete>
      <main className="font-kor overflow-x-hidden">
        {/* 메인 배너 */}
        <Motion initial="hidden" whileInView="visible" variants={fadeIn}>
          <div className="w-full h-[890px]">
            <Slider datas={datas} fill={true} arrowSize={54} />
          </div>
        </Motion>
        {/* 메인 */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <div className="w-full h-[1070px] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center h-[230px] font-eng mb-14">
              <p className="font-normal text-2xl mb-4 tracking-[4.8px]">
                SYATT
              </p>
              <p className="text-6xl font-bold tracking-tighter">
                특수페인팅 세계
              </p>
              <p className="text-center text-lg font-medium mt-9 leading-8">
                독특하고 창의적인 페인팅 기술의 아름다운 세계에서 새로운 예술과
                디자인을 경험해보세요.
                <br />
                특별한 효과와 창의성이 어우러진 특수페인팅의 매력에 빠져보세요.
              </p>
            </div>
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
          </div>
        </Motion>
        {/* *****************회사소개***************** */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <div className="w-full h-[1100px] flex flex-col items-center">
            <div className="w-[85%]">
              <p className="font-garamond font-normal text-2xl mb-4 tracking-[2.4px]">
                SYATT CORPORATION
              </p>
              <h2 className="text-6xl font-bold whitespace-nowrap relative">
                주식회사 샤뜨
                <div className="bg-black w-screen h-[5px] absolute bottom-[12px] left-[410px]"></div>
              </h2>
              <p className="text-lg pt-9 mb-20">
                샤뜨는 지속적인 도전과 다양한 경험을 통해 다양한 특수 페인팅
                기법을 포페인팅 경험에 제공하며 <br /> 고급 기술과 창의성이
                결합된 포페인팅은 독특한 분위기를 조성하여 인상적인 결과물을
                선사합니다.
              </p>
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
                    샤뜨만의 노하우를 통해 여러분의 공간에 생기를
                    불어넣겠습니다.
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
            </div>
          </div>
        </Motion>
        {/* *****************모던마스터즈 & 마이더스메탈소개***************** */}
        <div className="w-full h-[1100px] flex flex-col items-center">
          <Motion initial="hidden" whileInView="visible" variants={container}>
            <div className="w-[85%]">
              <p className="font-garamond font-normal text-2xl mb-4 tracking-[2.4px]">
                MODERN MASTERS
              </p>
              <h2 className="text-6xl font-bold whitespace-nowrap relative">
                최고의 페인트
                <div className="bg-black w-screen h-[5px] absolute bottom-[12px] left-[410px]"></div>
              </h2>
              <p className="text-lg pt-9 mb-20">
                샤뜨는 세계적인 특수페인트 회사인 모던마스터즈와 마이더스메탈과
                협력하여 현대적이고 <br /> 고급스러운 특수 페인트 및 금속 마감
                솔루션을 제공하고 있습니다.
              </p>
              <div className="w-full h-[304px] flex border border-[#ececec] mb-[10px]">
                <div className="w-[531px] h-full bg-black flex justify-center items-center">
                  <Image src={MMLogo} alt="MMLogo" width={309} height={186} />
                </div>
                <div className="w-full h-full p-14">
                  <p className="font-garamond font-normal text-sm mb-[6px]">
                    MODERN MASTERS
                  </p>
                  <h2 className="text-3xl font-bold mb-5">모던마스터즈</h2>
                  <p className="text-lg mb-8">
                    고급 특수 페인트 및 금속 마감 솔루션 전문 제조업체로,
                    독특하고 혁신적인 디자인을 위한 제품을 선보이며 세계적인{" "}
                    <br /> 평가를 받고 있습니다. 미국을 중심으로 전 세계의
                    건축가, 디자이너, 예술가들에게 폭넓게 사용되고 있습니다.
                  </p>
                  <div className="flex gap-12">
                    <Link
                      href="/modern-masters"
                      className="font-garamond text-2xl flex gap-3 hover:underline"
                    >
                      GALLERY
                      <MdArrowForwardIos className="text-xl mt-[6px]" />
                    </Link>
                    <Link
                      href="/modern-masters/store"
                      className="font-garamond text-2xl flex gap-3 hover:underline"
                    >
                      STORE
                      <MdArrowForwardIos className="text-xl mt-[6px]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full h-[304px] flex border border-[#ececec]">
                <div className="w-[531px] h-full bg-black flex justify-center items-center">
                  <Image src={MMLogo} alt="MMLogo" width={309} height={186} />
                </div>
                <div className="w-full h-full p-14">
                  <p className="font-garamond font-normal text-sm mb-[6px]">
                    MODERN MASTERS
                  </p>
                  <h2 className="text-3xl font-bold mb-5">모던마스터즈</h2>
                  <p className="text-lg mb-8">
                    고급 특수 페인트 및 금속 마감 솔루션 전문 제조업체로,
                    독특하고 혁신적인 디자인을 위한 제품을 선보이며 세계적인{" "}
                    <br /> 평가를 받고 있습니다. 미국을 중심으로 전 세계의
                    건축가, 디자이너, 예술가들에게 폭넓게 사용되고 있습니다.
                  </p>
                  <div className="flex gap-12">
                    <Link
                      href="/modern-masters"
                      className="font-garamond text-2xl flex gap-3 hover:underline"
                    >
                      GALLERY
                      <MdArrowForwardIos className="text-xl mt-[6px]" />
                    </Link>
                    <Link
                      href="/modern-masters/store"
                      className="font-garamond text-2xl flex gap-3 hover:underline"
                    >
                      STORE
                      <MdArrowForwardIos className="text-xl mt-[6px]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>
        {/* 교육소개 */}
        <Motion initial="hidden" whileInView="visible" variants={container}>
          <div className="w-full h-[990px] flex flex-col justify-center items-center mb-48">
            <div className="flex flex-col justify-center items-center h-[230px] font-eng mb-14">
              <p className="font-normal text-2xl mb-4 tracking-[4.8px]">
                EDUCATION
              </p>
              <p className="text-6xl font-bold tracking-tighter">교육 소개</p>
              <p className="text-center text-lg font-light mt-9 leading-8">
                최고의 포페인팅 기술을 습득할 수 있는 기회를 제공합니다. <br />
                전문 강사들과의 상호작용을 통해 참가자들은 전문적인 기술을 배울
                수 있습니다.
              </p>
            </div>
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
                  <Link href="/education">예약하기</Link>
                </Button>
              </div>
            </div>
          </div>
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
    </RouteComplete>
  );
}
