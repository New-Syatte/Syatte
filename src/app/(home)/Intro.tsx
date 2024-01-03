import { AiOutlineSwapRight } from "react-icons/ai";
import Image from "next/image";
import NextLink from "@/components/NextLink/NextLink";
import main_use1 from "@/assets/main/main-use1.png";
import main_use2 from "@/assets/main/main-use2.png";

export default function Intro() {
  return (
    <div className="w-full h-screen bg-white">
      <div className="w-[1280px] h-full mx-auto relative">
        <div className="absolute top-[120px]">
          <p className="text-5xl">
            OUR
            <br />
            DURABILITY AND
            <br />
            QUAILTY
            <br />
            <span className="text-lg">
              COLUMBIA TOOLS의 높은 내구성과 품질을 경험해보세요.
            </span>
          </p>
        </div>
        <div className="absolute bottom-0 left-0">
          <Image src={main_use1} width={650} height={500} alt="use1" />
        </div>
        <div className="absolute top-[120px] right-0">
          <Image src={main_use2} width={542} height={744} alt="use2" />
        </div>
        <NextLink
          href={"/product"}
          className="absolute bottom-0 right-[34px] flex"
        >
          <p className="text-lg">전체 상품 보기</p>
          <AiOutlineSwapRight className="w-8 h-8 absolute right-[-34px] bottom-[-5px]" />
        </NextLink>
      </div>
    </div>
  );
}
