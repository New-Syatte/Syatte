import aplicatior from "@/assets/education/aplicator.jpg";
import master from "@/assets/education/master.jpg";
import oneday from "@/assets/education/oneday.jpg";

import Image, { StaticImageData } from "next/image";

interface EduDesignCardProps {
  type: "applicator" | "master" | "oneday";
}
const EduDesignCard = ({ type }: EduDesignCardProps) => {
  const cardBoxStyle =
    "flex flex-col w-[276px] shadow-2xl rounded-3xl shadow-2xl";
  const cardStyle =
    "bg-black-500 bg-black flex flex-col items-center rounded-b-3xl z-10";
  const cardTitleStyle = "mt-6 text-[33px] font-bold text-white";

  let src = {
    image: {} as StaticImageData,
    title: "",
    description: "",
  };
  switch (type) {
    case "applicator":
      src = {
        image: aplicatior,
        title: "Applicator",
        description: "실무에서 즉시 활용 가능한 역량을 강화할 수 있습니다.",
      };
      break;
    case "master":
      src = {
        image: master,
        title: "Master",
        description: "분야의 선두 주자로 발전 가능한 리더십 강화합니다.",
      };
      break;
    case "oneday":
      src = {
        image: oneday,
        title: "One Day",
        description: "빠르게 필요한 스킬 습득, 업무에 즉시 적용 가능합니다.",
      };
      break;
  }
  const { image, title, description } = src;
  return (
    <div className={cardBoxStyle}>
      <div className={"h-[320px] relative rounded-t-3xl border-2"}>
        <Image src={image} fill={true} alt={type} className={"rounded-t-3xl"} />
      </div>
      <div className={cardStyle}>
        <span className={cardTitleStyle}>{title}</span>
        <br />
        <span
          className={
            "mb-6 text-center text-sm font-normal text-white w-[228px]"
          }
        >
          {description}
        </span>
      </div>
    </div>
  );
};

export default EduDesignCard;
