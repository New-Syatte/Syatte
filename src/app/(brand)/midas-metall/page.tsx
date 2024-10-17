"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import logo from "public/brand/midasmetall-img/midasmetall-logo.png";
import YouTubeVideo from "@/components/youTubeVideo/YouTubeVideo";
import SubTitleBox from "@/components/subTitleBox/SubTitleBox";
// import BrandSlider from "@/components/brandSlider/BrandSlider";
import StoreSlider from "@/components/storeSlider/StoreSlider";
import ProductInfoList from "@/components/productInfoList/ProductInfoList";
import { getProducts } from "@/services/sanity/products";

const TITLE_BANNER_TEXT = `MIDAS METALLl은 10년 이상의 경험을 쌓은 팀으로 구성되어, 고객을 위한 우수한 금속 마감 솔루션을 제공하고 있습니다. 금속 선택부터 혼합물 준비, 그리고 표면 마감까지의 모든 단계에서 자체 개발한 MIDAS METALLl 제품을 제공합니다. 숙련된 기술자와 기획자로 이루어져 있어 다양한 금속 솔루션을 고객의 요구에 맞게 개발하고 있습니다. 금, 은, 구리 등 다양한 금속 소재를 사용하여 어떠한 형태의 마감이 가능합니다.`;
const MIDASMETALL_INFO_TEXT_1 = `마이다스 메탈은 고급 금속 마감 솔루션 분야에서 선도적인 기업으로 손꼽힙니다. IF Material Award 2007에서 수상한 금상과 IF 제품 디자인 어워드 2007에서의 주목을 통해 기술적 우수성과 디자인적 창의성을 입증하였습니다.`;
const MIDASMETALL_INFO_TEXT_2 = `뿐만 아니라, Thuringia Newspaper Group의 Founder's Prize Market Gap 2008을 획득하여 시장에서의 차별성과 혁신성을 인정받았으며, 2009년에는 건축 및 건설 부문 AIT 혁신상을 수상하여 업계에서의 혁신을 증명했습니다.`;
const MIDASMETALL_INFO_TEXT_3 = `이어진 2010년에는 튀링겐 창립자상에서 성공적인 젊은 기업 부문에서 3위를 차지하여 지속적인 성장과 혁신적인 업적을 선보이고 있습니다. 마이다스 메탈은 훌륭한 품질과 혁신적인 디자인을 바탕으로 꾸준한 성공을 이루어내고 있습니다.`;
const MIDASMETALL_ARTWORK_TEXT = `마이다스 메탈 페인트로 창조된 다채로운 작품들을 확인하세요. 고유한 텍스처와 색상으로 표현된 예술적인 아트워크를 확인할 수 있습니다.`;

const MidasMETALL = async () => {
  // const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const paintList = [];

  const products = await getProducts();

  const categorys = [
    {
      title: "마이다스 메탈",
      value: "midasMetal",
    },
  ];

  const categoryValues = categorys.map(category => category.value);

  for (let i = 1; i <= 6; ++i) {
    paintList.push({
      id: `paint${i}`,
      img: `brand/midasmetall-img/midasmetall-paint_${i}.png`,
    });
  }

  return (
    <>
      {/* 최상단 배너 영역 */}
      <div className="flex w-full flex-col bg-[#F6F6F6] min-h-[890px] sm:min-h-full sm:py-[60px]">
        <div className="flex flex-col my-auto">
          <div className="flex sm:flex-col">
            <div className="flex w-full justify-center items-center sm:w-[240px] sm:mx-auto">
              <Image src={logo} alt={""} className="" />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex text-[50px] font-[GmarketSansMedium] h-[56px] sm:text-[20px] sm:mx-auto sm:mt-[50px] sm:h-auto">
                독일 명품 페인트
              </div>
              <div className="flex text-[100px] font-[GmarketSansMedium] font-bold sm:text-[40px] sm:mx-auto">
                마이다스 메탈
              </div>
              <div className="flex text-[18px] max-w-[767px] h-[140px] mb-[36px] sm:h-full sm:text-[14px] sm:m-[0px] sm:mx-[35px] sm:mt-[20px] sm:text-center">
                {TITLE_BANNER_TEXT}
              </div>
              <div className="flex text-[18px] w-[200px] h-[50px] border-[1px] border-[#000000] justify-center items-center cursor-pointer sm:mx-auto sm:mt-7">
                제품 더 알아보기
              </div>
            </div>
          </div>
          <div className="flex w-full h-[246px] justify-between mt-[60px] sm:hidden">
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
      <div className="flex w-full h-[960px] p-[140px] relative overflow-hidden sm:flex-col sm:w-full sm:h-full sm:p-0 sm:py-[60px]">
        <div className="flex w-[300px] absolute top-[50px] right-[-150px] rotate-[-10deg] sm:w-[200px] sm:right-[-120px]">
          <img
            src={"brand/midasmetall-img/midasmetall-paint1-lg.png"}
            alt={"상단 페인트 이미지"}
          />
        </div>
        <div className="flex w-full my-auto px-auto sm:pb-10 z-10">
          <div className="flex flex-col">
            <div className="flex text-[20px] font-[GmarketSans] sm:text-[20px] sm:mx-auto">
              MIDAS METALL
            </div>
            <div className="flex text-[70px] font-[GmarketSans] font-bold mb-[40px] sm:text-[40px] sm:mx-auto">
              마이다스 메탈
            </div>
            <div className="flex flex-col max-w-[760px] mr-10 text-[18px] sm:text-[14px] sm:max-w-full sm:m-0 sm:mx-[35px] sm:text-center">
              <div className="flex mb-[40px]">{MIDASMETALL_INFO_TEXT_1}</div>
              <div className="flex mb-[40px]">{MIDASMETALL_INFO_TEXT_2}</div>
              <div className="flex mb-[50px]">{MIDASMETALL_INFO_TEXT_3}</div>
            </div>
            <div className="flex text-[24px] items-center cursor-pointer sm:mx-auto">
              STORE
              <div className="flex text-[20px] ml-2 pt-[1px]">
                <GrNext />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center my-auto z-10">
          <div className="w-2/3">
            <YouTubeVideo urlId={"03mGS92FB50"} />
          </div>
        </div>
      </div>
      {/* 제품 특징 */}
      <div className="flex flex-col w-full h-auto mt-[100px] mb-[240px] relative sm:mb-[150px]">
        <div className="flex w-[350px] absolute top-0 left-[-150px] rotate-[15deg] sm:w-[200px] sm:left-[-120px]">
          <img
            src={"brand/midasmetall-img/midasmetall-paint2-lg.png"}
            alt={"하단 페인트 이미지"}
          />
        </div>
        <div className="flex justify-center">
          <SubTitleBox engValue={"PRODUCT FEATURES"} korValue={"제품 특징"} />
        </div>
        <div className="flex justify-center gap-3 z-10">
          <ProductInfoList />
        </div>
      </div>
      {/* 아티스트 작품 */}
      <div className="flex flex-col w-full justify-center overflow-hidden">
        <div className="flex justify-center">
          <SubTitleBox engValue={"ARTWORK"} korValue={"아티스트 작품"} />
        </div>
        <div className="flex w-[700px] mt-[47px] mb-[64px] text-center mx-auto sm:w-full sm:text-[14px] sm:px-[35px]">
          {MIDASMETALL_ARTWORK_TEXT}
        </div>
        <div className="flex w-full sm:w-[730px]">
          <img
            src={"brand/midasmetall-img/midasmetall-artwork.png"}
            alt={`페인팅 작품`}
            className="flex w-full"
          />
        </div>
      </div>
      {/* 공식 스토어 */}
      <div className="flex flex-col h-full w-full justify-center mt-[150px] mb-[240px] relative overflow-hidden">
        <div className="flex w-[500px] absolute bottom-0 right-[-300px] transform rotate-[-15deg] sm:w-[200px] sm:right-[-100px]">
          <img
            src={"brand/midasmetall-img/midasmetall-paint3-lg.png"}
            alt={"왼쪽 페인트 이미지"}
          />
        </div>
        <div className="flex w-[380px] absolute top-0 left-[-230px] transform rotate-[15deg] sm:w-[200px] sm:left-[-120px]">
          <img
            src={"brand/midasmetall-img/midasmetall-paint4-lg.png"}
            alt={"오른쪽 페인트 이미지"}
          />
        </div>
        <div className="flex justify-center mb-[50px]">
          <SubTitleBox engValue={"STORE"} korValue={"공식 스토어"} />
        </div>
        {/* 스토어 영역 */}
        <section className="flex w-full justify-center mb-[50px] z-10 sm:w-full">
          {categoryValues.map((category: string, index: number) => (
            <div key={index}>
              <StoreSlider
                key={category}
                products={products}
                category={category}
              />
            </div>
          ))}
        </section>
        <div className="flex w-full justify-center">
          <div className="flex w-[170px] h-[50px] bg-[#000000] text-[#ffffff] justify-center items-center mt-[100px] pb-1 cursor-pointer sm:mt-[30px]">
            스토어 이동
          </div>
        </div>
      </div>
    </>
  );
};

export default MidasMETALL;
