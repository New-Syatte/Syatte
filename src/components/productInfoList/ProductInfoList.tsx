import React from "react";

const productInfoList = [
  {
    id: 1,
    title: `자연스러운 금속성 외관, 느낌 및 녹청 형성`,
    description: `MIDAS 금속은 자연스러운 금속의 외관과 느낌을 제공하며 독특한 녹청 형성을 통해 표면에 자연의 아름다움을 살려줍니다.`,
  },
  {
    id: 2,
    title: `실내 및 실외 표면에 적합`,
    description: `다양한 환경에서 사용 가능하여, 실내 및 실외 표면에서도 뛰어난 성능을 발휘합니다.`,
  },
  {
    id: 3,
    title: `최대 95% 순금속 함량`,
    description: `제품에 따라 다르지만, 최대 95%의 순금속 함량을 가진 MIDAS 금속은 높은 품질을 보장합니다.`,
  },
  {
    id: 4,
    title: `이음매 없는 코팅으로 물체의 모양, 크기 관계없이 적용 가능`,
    description: `이음매 없는 코팅 기술은 물체의 형태나 크기에 구애받지 않고 균일한 층을 형성할 수 있어 다양한 응용이 가능합니다.`,
  },
  {
    id: 5,
    title: `거의 모든 표면에 탁월한 접착 특성`,
    description: `MIDAS 금속은 MDF, 목재, 석고보드, 석재, 콘크리트, 금속, 세라믹, 플라스틱 등 다양한 표면에 뛰어난 접착력을 보여줍니다.`,
  },
  {
    id: 6,
    title: `자유롭고 예술적이며 개성 있는 표면 디자인`,
    description: `예술적이고 독창적인 표면 디자인을 실현하여 사용자에게 자유로움과 개성을 부여합니다.`,
  },
  {
    id: 7,
    title: `실온에서 빠르게 건조`,
    description: `빠른 건조 속도로 생산성을 향상시키며, 작업 시간을 단축시킵니다.`,
  },
  {
    id: 8,
    title: `긴 수명과 뛰어난 탄력성`,
    description: `높은 내구성과 탄력성을 갖춘 MIDAS 금속은 오랜 기간 동안 안정된 성능을 제공합니다.`,
  },
  {
    id: 9,
    title: `서리, 날씨 및 자외선 차단`,
    description: `서리, 날씨 및 자외선으로부터 표면을 보호하는 특성을 갖고 있습니다.`,
  },
  {
    id: 10,
    title: `내화학성`,
    description: `화학적인 영향으로부터 표면을 보호하여 내구성을 향상시킵니다.`,
  },
];

const ProductInfoList = () => {
  return (
    <div className="grid grid-cols-2 gap-3 w-[1300px] mt-[60px]">
      {productInfoList.map((data, index) => (
        <>
          <div className="flex w-auto h-[100px] border-[#000000] border-[1px]">
            <div className="flex bg-[#000000] text-[36px] text-[#ffffff] min-w-[75px] justify-center items-center">{data.id}</div>
            <div className="flex flex-col p-[14px]">
              <div className="flex text-[18px] font-bold">{data.title}</div>
              <div className="flex text-[14px]">{data.description}</div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ProductInfoList;
