"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import logo from "public/brand/modernmasters-img/modernmasters-logo.png";
import YouTubeVideo from "@/components/youTubeVideo/YouTubeVideo";
import SubTitleBox from "@/components/subTitleBox/SubTitleBox";
import BrandSlider from "@/components/brandSlider/BrandSlider";
import StoreSlider from "@/components/storeSlider/StoreSlider";
import { useState } from "react";

const TITLE_BANNER_TEXT = `Modern Masters는 고급 특수 페인트를 제조하는 세계 최고의 회사입니다. 제품은 미국을 비롯한 다양한 국가의 4,000개 이상의 소매점에서 판매며, 회사의 제품 라인에는 건축가, 디자이너, 계약자, 그리고 장식 화가를 위해 특별히 제작된 다양한 제품이 포함되어 있습니다. Metallic Paint Collection, Metal Effects, 건축 텍스처, 테마 페인트, 블랙라이트 페인트, 유약, 광택제, 그리고 Crackles 등이 그 중에 속합니다. Modern Masters의 제품은 전 세계적으로 유명한 장소에서 사용되고 있습니다.`;
const MODERN_MASTERS_INFO_TEXT_1 = `Modern Masters는 1960년대 초에 캘리포니아의 San Fernando Valley에서 시작된 회사로, 처음에는 Custom Paint & Chemical로 알려져 있었습니다. 주로 가구, 장식용 액세서리, 주거용 조명, 그리고 벽 장식용 코팅 제품을 생산했습니다. 회사는 최고 품질의 코팅을 제공하고 "지불한 만큼 얻는다"는 모토를 따르며 성장했습니다.`;
const MODERN_MASTERS_INFO_TEXT_2 = `1989년, 가구 산업의 변화에 대응하기 위해 Modern Masters는 초점을 바꾸어 고급 예술가 재료 시장으로 진출했습니다. 이때 회사는 Modern Masters Artist Acrylics라는 고급 아크릴 페인트를 선보였고, 이는 투명 용기에 담겨 다양한 색상을 소비자에게 제공했습니다.`;
const MODERN_MASTERS_INFO_TEXT_3 = `1996년에는 회사의 이름이 CPC Modern Masters Inc.로 변경되었고, 2000년 8월에는 오하이오주 메디나에 있는 RPM Inc.라는 상장 지주 회사에 매각되었습니다. 그 후, 2017년에는 Rust-Oleum 브랜드 제품군에 합류하여 지속적인 성장을 이어가고 있습니다.`;
const MODERN_MASTERS_SERIES_TEXT = `모던마스터즈는 Colorfast, Decorative Painter's, Metal Effects, Metallic Paint Collection, Venetian Plaster 등 다양한 페인트 라인을 제공하여 작업자들이 다양한 스타일과 효과를 선택할 수 있습니다.`;
const MODERN_MASTERS_ARTWORK_TEXT = `모던마스터즈 페인트로 창조된 다채로운 작품들을 확인하세요. 고유한 텍스처와 색상으로 표현된 예술적인 아트워크를 확인할 수 있습니다.`;

const Modernmasters = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const paintList = [];

  for (let i = 1; i <= 6; ++i) {
    paintList.push({
      id: `paint${i}`,
      img: `brand/modernmasters-img/modernmasters-paint_${i}.png`,
    });
  }

  const brandList = [];

  for (let i = 1; i <= 5; ++i) {
    brandList.push({
      id: `brand${i}`,
      img: `brand/modernmasters-img/modernmasters-brand_${i}.png`,
    });
  }

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: any) => {
    console.log("동영상 플레이어가 준비되었습니다.");
  };

  return (
    <>
      {/* 최상단 배너 영역 */}
      <div className="flex w-full flex-col bg-[#F6F6F6] h-[890px]">
        <div className="flex flex-col my-auto">
          <div className="flex">
            <div className="flex w-full justify-center items-center">
              <Image src={logo} alt={""} className="" />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex text-[50px] font-[GmarketSansMedium] h-[56px]">
                미국 명품 페인트
              </div>
              <div className="flex text-[100px] font-[GmarketSansMedium] font-bold">
                모던마스터즈
              </div>
              <div className="flex text-[18px] max-w-[767px] h-[140px] mb-[36px]">
                {TITLE_BANNER_TEXT}
              </div>
              <div className="flex text-[18px] w-[200px] h-[50px] border-[1px] border-[#000000] justify-center items-center cursor-pointer">
                제품 더 알아보기
              </div>
            </div>
          </div>
          <div className="flex w-full h-[246px] justify-between mt-[60px]">
            <div className="flex items-center px-10 text-[24px] hover:bg-[#e5e5e5] cursor-pointer">
              <GrPrevious />
            </div>
            {paintList.map((data, index) => (
              <>
                <img src={data.img} alt={`페인트${index + 1}`} />
              </>
            ))}
            <div className="flex items-center px-10 text-[24px] hover:bg-[#e5e5e5] cursor-pointer">
              <GrNext />
            </div>
          </div>
        </div>
      </div>
      {/* 제품 소개 */}
      <div className="flex w-full h-[960px] p-[140px] relative overflow-hidden">
        <div className="flex w-[400px] absolute top-6 left-[-200px]">
          <img
            src={"brand/modernmasters-img/silver_brush.png"}
            alt={"상단붓"}
          />
        </div>
        <div className="flex w-[600px] absolute bottom-0 right-[-300px]">
          <img
            src={"brand/modernmasters-img/silver_brush.png"}
            alt={"하단붓"}
          />
        </div>
        <div className="flex w-[500px] absolute top-20 right-0 translate-x-1/4 transform rotate-[-15deg]">
          <img
            src={"brand/modernmasters-img/modernmasters-paint-lg.png"}
            alt={"페인트통"}
          />
        </div>
        <div className="flex w-full my-auto px-auto z-10">
          <div className="flex flex-col">
            <div className="flex text-[20px] font-[GmarketSans]">
              MODERN MASTERS
            </div>
            <div className="flex text-[70px] font-[GmarketSans] font-bold mb-[40px]">
              모던마스터즈
            </div>
            <div className="flex w-[760px] text-[18px] mb-[40px]">
              {MODERN_MASTERS_INFO_TEXT_1}
            </div>
            <div className="flex w-[760px] text-[18px] mb-[40px]">
              {MODERN_MASTERS_INFO_TEXT_2}
            </div>
            <div className="flex w-[760px] text-[18px] mb-[50px]">
              {MODERN_MASTERS_INFO_TEXT_3}
            </div>
            <div className="flex text-[24px] items-center cursor-pointer">
              STORE
              <div className="flex text-[20px] ml-2 pt-[1px]">
                <GrNext />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center my-auto z-10">
          <div className="flex rounded-lg overflow-hidden mt-[100px]">
            <YouTubeVideo urlId={"qj5TKQbbRYg"} />
          </div>
        </div>
      </div>
      {/* 페인트 시리즈 */}
      <div className="flex flex-col w-full h-auto mt-[100px] mb-[240px]">
        <div className="flex justify-center">
          <SubTitleBox
            engValue={"MODERN MASTERS SERIES"}
            korValue={"페인트 시리즈"}
          />
        </div>
        <div className="flex w-[860px] mt-[47px] mb-[64px] text-center mx-auto">
          {MODERN_MASTERS_SERIES_TEXT}
        </div>
        <div className="flex justify-center gap-3">
          {brandList.map((data, index) => (
            <>
              <div
                className="flex w-[190px] border-[#000000] border-[1px]"
                onClick={() => {
                  setActiveBrandIndex(index);
                }}
              >
                <img src={data.img} alt={`브랜드${index + 1}`} />
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <BrandSlider activeBrandIndex={activeBrandIndex} />
        </div>
      </div>
      {/* 아티스트 작품 */}
      <div className="flex flex-col w-full justify-center overflow-hidden">
        <div className="flex justify-center">
          <SubTitleBox engValue={"ARTWORK"} korValue={"아티스트 작품"} />
        </div>
        <div className="flex w-[700px] mt-[47px] mb-[64px] text-center mx-auto">
          {MODERN_MASTERS_ARTWORK_TEXT}
        </div>
        <div className="flex w-full">
          <img
            src={"brand/modernmasters-img/modernmasters-artwork.png"}
            alt={`페인팅 작품`}
            className="flex w-full"
          />
        </div>
      </div>
      {/* 공식 스토어 */}
      <div className="flex flex-col h-full w-full justify-center mt-[150px] mb-[240px] relative overflow-hidden">
        <div className="flex w-[500px] absolute bottom-0 right-[-200px] transform rotate-[-15deg]">
          <img
            src={"brand/modernmasters-img/modernmasters-store_right.png"}
            alt={"페인트통2"}
          />
        </div>
        <div className="flex w-[380px] absolute top-0 left-[-160px] transform rotate-[15deg]">
          <img
            src={"brand/modernmasters-img/modernmasters-store_left.png"}
            alt={"페인트통3"}
          />
        </div>
        <div className="flex justify-center mb-[50px]">
          <SubTitleBox engValue={"STORE"} korValue={"공식 스토어"} />
        </div>
        <div className="flex justify-center mt-10">
          <StoreSlider />
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-[170px] h-[50px] bg-[#000000] text-[#ffffff] justify-center items-center mt-[100px] pb-1 cursor-pointer">
            스토어 이동
          </div>
        </div>
      </div>
    </>
  );
};

export default Modernmasters;
