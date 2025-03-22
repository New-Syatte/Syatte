"use client";

import { GrNext, GrPrevious } from "react-icons/gr";
import Image from "next/image";

export default function PaintSlider() {
  const paintList = Array.from({ length: 6 }, (_, i) => ({
    id: `paint${i + 1}`,
    img: `/brand/modernmasters-img/modernmasters-paint_${i + 1}.png`,
  }));

  return (
    <div className="flex w-full h-[246px] justify-between mt-[60px] overflow-hidden sm:hidden">
      <div className="flex items-center px-10 text-[24px] hover:bg-[#e5e5e5] cursor-pointer">
        {/* <GrPrevious /> */}
      </div>
      {paintList.map((data, index) => (
        <Image
          key={data.id}
          src={data.img}
          alt={`페인트${index + 1}`}
          width={200}
          height={246}
          style={{ objectFit: "contain" }}
        />
      ))}
      <div className="flex items-center px-10 text-[24px] hover:bg-[#e5e5e5] cursor-pointer">
        {/* <GrNext /> */}
      </div>
    </div>
  );
}
