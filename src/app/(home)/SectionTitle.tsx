import ResponsiveDesc from "./ResponsiveDesc";

interface SectionTitleProps {
  type: "syatt" | "brand" | "introduce" | "education";
  children: React.ReactNode;
}

const SectionTitle = ({ type, children }: SectionTitleProps) => {
  const syattTitle = {
    title: "SYATT CORPORATION",
    subTitle: "주식회사 샤뜨",
    description:
      "샤뜨는 지속적인 도전과 다양한 경험을 통해 다양한 특수 페인팅 기법을 포페인팅 경험에 제공하며 고급 기술과 창의성이 결합된 포페인팅은 독특한 분위기를 조성하여 인상적인 결과물을 선사합니다.",
  };
  const brandTitle = {
    title: "BEST PAINTS",
    subTitle: "최고의 페인트",
    description:
      "샤뜨는 세계적인 특수페인트 회사인 모던마스터즈와 마이더스메탈과 협력하여 현대적이고 고급스러운 특수 페인트 및 금속 마감 솔루션을 제공하고 있습니다.",
  };
  const introduceTitle = {
    title: "SYATT",
    subTitle: "특수페인팅 세계",
    description:
      "독특하고 창의적인 페인팅 기술의 아름다운 세계에서 새로운 예술과 디자인을 경험해보세요. 특별한 효과와 창의성이 어우러진 특수페인팅의 매력에 빠져보세요.",
  };

  const educationTitle = {
    title: "EDUCATION",
    subTitle: "교육 소개",
    description:
      "최고의 포페인팅 기술을 습득할 수 있는 기회를 제공합니다. 전문 강사들과의 상호작용을 통해 참가자들은 전문적인 기술을 배울 수 있습니다.",
  };

  const isCenter = type === "introduce" || type === "education";

  let content = { title: "", subTitle: "", description: "" };
  switch (type) {
    case "syatt":
      content = syattTitle;
      break;
    case "brand":
      content = brandTitle;
      break;
    case "introduce":
      content = introduceTitle;
      break;
    case "education":
      content = educationTitle;
      break;
    default:
      throw new Error("지원하는 타입이 존재하지 않습니다.");
  }

  const { title: mainTitle, subTitle, description } = content;
  return (
    <div
      className={
        "w-full h-auto flex flex-col items-center my-20 sm:my-36 justify-center sm:justify-normal" +
        " " +
        (isCenter && "justify-center") +
        " " +
        ((type === "syatt" || type === "education") && "bg-bgGray py-10")
      }
    >
      <div
        className={
          isCenter
            ? "flex flex-col justify-center items-center w-[90%] h-[250px] font-eng mb-14"
            : "flex flex-col justify-center items-center font-eng mb-14 sm:w-[85%] sm:block sm:mb-0"
        }
      >
        <p
          className={
            "font-garamond font-normal text-base sm:text-2xl mb-4 mt-8" +
            " " +
            (isCenter ? "tracking-[4.8px]" : "tracking-[2.4px]")
          }
        >
          {mainTitle}
        </p>
        <h2
          className={
            "text-3xl sm:text-6xl font-bold whitespace-nowrap relative" +
            " " +
            (isCenter && "tracking-tighter")
          }
        >
          {subTitle}
          {!isCenter && (
            <div className="bg-black w-screen h-[5px] absolute bottom-[12px] left-[410px]"></div>
          )}
        </h2>
        <p
          className={
            isCenter
              ? "text-left px-6 font-medium mt-9 leading-8 sm:break-keep sm:text-center text-sm sm:text-lg sm:px-0"
              : "text-sm text-center sm:text-left sm:text-lg sm:px-0 px-6 pt-3 sm:pt-9 sm:mb-20 sm:w-1/2 break-keep"
          }
        >
          <ResponsiveDesc desc={description} />
        </p>
        {!isCenter && children}
      </div>
      {isCenter && children}
    </div>
  );
};

export default SectionTitle;
