"use client";
import React from "react";

interface SubTitleBoxProps {
  engValue: string;
  korValue: string;
}

const SubTitleBox: React.FC<SubTitleBoxProps> = ({ engValue, korValue }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full font-[GmarketSans] justify-center text-[20px] mb-[22px]">
        {engValue}
      </div>
      <div className="flex w-full font-[GmarketSans] justify-center font-bold text-[70px] border-[#000000] border-y-[2px]">
        {korValue}
      </div>
    </div>
  );
};

export default SubTitleBox;
