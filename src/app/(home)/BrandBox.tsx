import { MdArrowForwardIos } from "react-icons/md";
import MMLogo from "@/assets/modern-masters-logo.png";
import MDLogo from "@/assets/midas-metal-logo.svg";
import Image from "next/image";
import Link from "next/link";
import URLS from "@/constants/urls";

interface BrandBoxProps {
  brand: "modernMasters" | "midasMetal";
}

const BrandBox = ({ brand }: BrandBoxProps) => {
  const ModernMastersContent = {
    EngBrand: "MODERN MASTERS",
    KrBrand: "모던 마스터즈",
    logo: MMLogo,
    description:
      "고급 특수 페인트 및 금속 마감 솔루션 전문 제조업체로, 독특하고 혁신적인 디자인을 위한 제품을 선보이며 세계적인 평가를 받고 있습니다. 미국을 중심으로 전 세계의 건축가, 디자이너, 예술가들에게 폭넓게 사용되고 있습니다.",
    gallery: URLS.MODERN_MASTERS,
    store: URLS.PRODUCT_STORE, // 추후 수정(Issue #20)
  };

  const MidasMetalContent = {
    EngBrand: "MIDAS METAL",
    KrBrand: "마이다스 메탈",
    logo: MDLogo,
    description:
      "우수한 금속 마감 솔루션을 제공합니다. 금속 선택부터 혼합물 준비, 그리고 표면 마감까지 모든 과정에서 자체 개발한 제품을 활용하여 다양한 금속 솔루션을 고객의 요구에 맞게 제작합니다.",
    gallery: URLS.MIDAS_METAL,
    store: URLS.PRODUCT_STORE, // 추후 수정(Issue #20)
  };
  const isModernMasters = brand === "modernMasters";

  let content = isModernMasters ? ModernMastersContent : MidasMetalContent;
  const { EngBrand, KrBrand, logo, description, gallery, store } = content;

  return (
    <div
      className={
        "sm:w-[95%] w-full sm:h-full h-[304px] flex sm:flex-col flex-row border border-[#ececec] bg-bgGray" +
        " " +
        (isModernMasters ? "sm:mb-[20px] mb-[10px]" : "")
      }
    >
      <div className="sm:w-full w-[531px] sm:p-6 p-0 h-full bg-black flex justify-center items-center">
        <Image
          src={logo}
          alt="MidasMetalLogo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "70%", height: "auto" }}
        />
      </div>
      <div className="w-full h-full sm:p-5 p-14 sm:flex flex-col justify-center items-center block">
        <p className="font-garamond font-normal sm:text-base text-sm mb-[6px]">
          {EngBrand}
        </p>
        <h2 className="text-3xl font-bold mb-5">{KrBrand}</h2>
        <p className="sm:text-sm text-lg mb-8 whitespace-break-spaces break-keep">
          {description}
        </p>
        <div className="self-start flex sm:block gap-12">
          <Link
            href={gallery}
            className="font-garamond text-2xl flex gap-3 hover:underline tracking-widest"
          >
            GALLERY
            <MdArrowForwardIos className="text-xl mt-[6px]" />
          </Link>
          <Link
            href={store} // 추후 수정(Issue #20)
            className="font-garamond text-2xl flex gap-3 hover:underline tracking-widest sm:mt-2 my-0"
          >
            STORE
            <MdArrowForwardIos className="text-xl mt-[6px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandBox;
