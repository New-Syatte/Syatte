import aplicatior from "@/assets/education/aplicator.png";
import master from "@/assets/education/master.png";
import oneday from "@/assets/education/oneday.png";

import Image, { StaticImageData } from "next/image";

interface EduDesignCardProps {
  type: "aplicatior" | "master" | "oneday";
}
const EduDesignCard = ({ type }: EduDesignCardProps) => {
  let src = {
    image: {} as StaticImageData,
    title: "",
    description: "",
    indexNumber: null as number | null,
  };

  switch (type) {
    case "aplicatior":
      src = {
        image: aplicatior,
        title: "Aplicatior",
        description: "실무에서 즉시 활용 가능한 역량을 강화할 수 있습니다.",
        indexNumber: 1,
      };
      break;
    case "master":
      src = {
        image: master,
        title: "Master",
        description: "분야의 선두 주자로 발전 가능한 리더십 강화합니다.",
        indexNumber: 2,
      };
      break;
    case "oneday":
      src = {
        image: oneday,
        title: "One Day",
        description: "빠르게 필요한 스킬 습득, 업무에 즉시 적용 가능합니다.",
        indexNumber: 3,
      };
      break;
  }

  const { image, title, description, indexNumber } = src;
  return (
    <div className="flex flex-col">
      <div className="hidden sm:flex h-44 items-end justify-end">
        <span className="text-[120px] text-primaryBlue opacity-20 h-40">
          {indexNumber}
        </span>
      </div>
      <div className="flex flex-col w-[150px] sm:w-[296px] h-[250px] sm:h-[453px] sm:shadow-2xl rounded-3xl bg-bgGray items-center justify-center p-3 sm:p-5 border border-tableBorderGray">
        <div className="relative w-[130px] h-auto sm:w-[257px] sm:h-[279px]">
          <Image
            src={image}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={type}
            className={"rounded-3xl"}
          />
        </div>
        <div className={"flex flex-col items-center rounded-b-3xl z-10"}>
          <span
            className={
              "mt-4 sm:mt-8 text-base sm:text-[32px] font-bold text-black font-GmarketSans"
            }
          >
            {title}
          </span>
          <span
            className={
              "text-center text-xs sm:text-sm font-medium text-black sm:w-[228px]"
            }
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EduDesignCard;
