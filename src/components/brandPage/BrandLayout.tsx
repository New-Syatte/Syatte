import Image from "next/image";
import { GrNext } from "react-icons/gr";
import SubTitleBox from "@/components/subTitleBox/SubTitleBox";
import { StaticImageData } from "next/image";

interface BrandLayoutProps {
  logo: StaticImageData;
  brandName: string;
  countryName: string;
  titleBannerText: string;
  infoTexts: string[];
  videoId: string;
  artworkText: string;
  children?: React.ReactNode;
  VideoSection: React.ComponentType<{ videoId: string }>;
  PaintSlider: React.ComponentType;
  StoreSection: React.ComponentType<{ products: any[] }>;
  products: any[];
}

export default function BrandLayout({
  logo,
  brandName,
  countryName,
  titleBannerText,
  infoTexts,
  videoId,
  artworkText,
  children,
  VideoSection,
  PaintSlider,
  StoreSection,
  products,
}: BrandLayoutProps) {
  const getArtworkPath = (name: string) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "");
    const imagePath = `/brand/${formattedName}-img/${formattedName}-artwork.png`;
    return imagePath;
  };

  return (
    <>
      {/* 최상단 배너 영역 */}
      <div className="flex w-full flex-col bg-[#F6F6F6] min-h-[890px] sm:min-h-full sm:py-[60px]">
        <div className="flex flex-col my-auto">
          <div className="flex sm:flex-col">
            <div className="flex w-full justify-center items-center sm:w-[240px] sm:mx-auto sm:pl-4">
              <Image
                src={logo}
                alt={`${brandName} Logo`}
                priority
                width={450}
                height={280}
                className="sm:w-[240px] sm:mx-auto sm:pl-4"
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex text-[50px] font-[GmarketSansMedium] h-[56px] sm:text-[20px] sm:mx-auto sm:mt-[50px] sm:h-auto">
                {countryName} 명품 페인트
              </div>
              <div className="flex text-[100px] font-[GmarketSansMedium] font-bold sm:text-[40px] sm:mx-auto">
                {brandName}
              </div>
              <div className="flex text-[18px] max-w-[767px] mr-[140px] mb-[36px] sm:text-[14px] sm:m-[0px] sm:mx-[35px] sm:mt-[20px] sm:text-center">
                {titleBannerText}
              </div>
              <div className="flex text-[18px] w-[200px] h-[50px] border-[1px] border-[#000000] justify-center items-center cursor-pointer sm:mx-auto sm:mt-7">
                제품 더 알아보기
              </div>
            </div>
          </div>
          <PaintSlider />
        </div>
      </div>

      {/* 제품 소개 */}
      <div className="flex w-full h-[960px] p-[140px] relative overflow-hidden sm:flex-col sm:w-full sm:h-full sm:p-0 sm:py-[60px]">
        <div className="flex w-full my-auto px-auto z-10 sm:flex-col sm:w-full sm:h-full sm:p-0 sm:py-[60px] sm:justify-center sm:items-center sm:gap-[60px]">
          <div className="flex flex-col">
            <div className="flex text-[20px] font-[GmarketSans] sm:text-[20px] sm:mx-auto">
              {brandName.toUpperCase()}
            </div>
            <div className="flex text-[70px] font-[GmarketSans] font-bold mb-[40px] sm:text-[40px] sm:mx-auto">
              {brandName}
            </div>
            <div className="flex flex-col max-w-[760px] mr-10 text-[18px] sm:text-[14px] sm:max-w-full sm:m-0 sm:mx-[35px] sm:text-center">
              {infoTexts.map((text, index) => (
                <div key={index} className="flex mb-[40px]">
                  {text}
                </div>
              ))}
              <div className="flex text-[24px] items-center cursor-pointer sm:mx-auto">
                STORE
                <div className="flex text-[20px] ml-2 pt-[1px]">
                  <GrNext />
                </div>
              </div>
            </div>
          </div>
          <VideoSection videoId={videoId} />
        </div>
      </div>

      {children}

      {/* 아티스트 작품 */}
      <div className="flex flex-col w-full justify-center overflow-hidden">
        <div className="flex justify-center">
          <SubTitleBox engValue={"ARTWORK"} korValue={"아티스트 작품"} />
        </div>
        <div className="flex w-[700px] mt-[47px] mb-[64px] text-center mx-auto sm:w-full sm:text-[14px] sm:px-[35px]">
          {artworkText}
        </div>
        <div className="flex w-full sm:w-[730px]">
          <Image
            src={getArtworkPath(brandName)}
            alt={`${brandName} 페인팅 작품`}
            width={1920}
            height={1080}
            className="w-full"
          />
        </div>
      </div>

      {/* 공식 스토어 */}
      <StoreSection products={products} />
    </>
  );
}
