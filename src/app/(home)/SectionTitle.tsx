interface SectionTitleProps {
  type: "syatte" | "brand" | "introduce" | "education";
  children: React.ReactNode;
}

const SectionTitle = ({ type, children }: SectionTitleProps) => {
  const syatteTitle = {
    title: "SYATTE CORPORATION",
    subTitle: "주식회사 샤뜨",
    description:
      "샤뜨는 지속적인 도전과 다양한 경험을 통해 다양한 특수 페인팅 기법을 포페인팅 경험에 제공하며 고급 기술과 창의성이 결합된 포페인팅은 독특한 분위기를 조성하여 인상적인 결과물을 선사합니다.",
  };
  const brandTitle = {
    title: "MODERN MASTERS",
    subTitle: "최고의 페인트",
    description:
      "샤뜨는 세계적인 특수페인트 회사인 모던마스터즈와 마이더스메탈과 협력하여 현대적이고 고급스러운 특수 페인트 및 금속 마감 솔루션을 제공하고 있습니다.",
  };
  const introduceTitle = {
    title: "SYATTE",
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
    case "syatte":
      content = syatteTitle;
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
        "w-full h-[1100px] flex flex-col items-center" +
        " " +
        (isCenter && "justify-center")
      }
    >
      <div
        className={
          isCenter
            ? "flex flex-col justify-center items-center h-[230px] font-eng mb-14"
            : "w-[85%]"
        }
      >
        <p
          className={
            "font-garamond font-normal text-2xl mb-4" +
            " " +
            (isCenter ? "tracking-[4.8px]" : "tracking-[2.4px]")
          }
        >
          {mainTitle}
        </p>
        <h2
          className={
            "text-6xl font-bold whitespace-nowrap relative" +
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
              ? "text-center text-lg font-medium mt-9 leading-8 break-keep"
              : "text-lg pt-9 mb-20 w-1/2 break-keep"
          }
        >
          {description.split(".").map((sentence, index) => (
            <span key={index}>
              {sentence.trim()}
              {index < description.split(".").length - 1 && "."}
              <br />
            </span>
          ))}
        </p>
        {!isCenter && children}
      </div>
      {isCenter && children}
    </div>
  );
};

export default SectionTitle;

// const eduSection = (
//   <div className="w-full h-[990px] flex flex-col justify-center items-center mb-48">
//     <div className="flex flex-col justify-center items-center h-[230px] font-eng mb-14">
//       <p className="font-normal text-2xl mb-4 tracking-[4.8px]">EDUCATION</p>
//       <p className="text-6xl font-bold tracking-tighter">교육 소개</p>
//       <p className="text-center text-lg font-medium mt-9 leading-8">
//         최고의 포페인팅 기술을 습득할 수 있는 기회를 제공합니다. <br />
//         전문 강사들과의 상호작용을 통해 참가자들은 전문적인 기술을 배울 수
//         있습니다.
//       </p>
//     </div>
//     {children}
//   </div>
// );

// const introduceSection = (
//   <div className="w-full h-[1070px] flex flex-col justify-center items-center">
//     <div className="flex flex-col justify-center items-center h-[230px] font-eng mb-14">
//       <p className="font-normal text-2xl mb-4 tracking-[4.8px]">SYATT</p>
//       <p className="text-6xl font-bold tracking-tighter">특수페인팅 세계</p>
//       <p className="text-center text-lg font-medium mt-9 leading-8">
//         독특하고 창의적인 페인팅 기술의 아름다운 세계에서 새로운 예술과 디자인을
//         경험해보세요.
//         <br />
//         특별한 효과와 창의성이 어우러진 특수페인팅의 매력에 빠져보세요.
//       </p>
//     </div>
//     {children}
//   </div>
// );
