"use client";
import { useState } from "react";
import DetailInfo from "./DetailInfo";
import RefundOrReturn from "./RefundOrReturn";
import CautionNotice from "./CautionNotice";

interface props {
  detailImage: string;
}

const ProductInfoNav = ({ detailImage }: props) => {
  const [selectedTab, setSelectedTab] = useState("상세 설명");

  const tabs = ["상세 설명", "교환/반품", "주의사항"];

  return (
    <div>
      <div className="flex gap-[2px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "border-b-2 border-zinc-500 w-[170px] h-[43px] pt-[11.10px] pb-[13.08px] bg-stone-100 rounded justify-center items-center inline-flex"
                : "border-b border-zinc-200 bg-stone-50 w-[170px] h-[43px] pt-[11.10px] pb-[13.08px] rounded justify-center items-center inline-flex"
            }`}
          >
            <span className="text-center text-neutral-800 text-xs font-bold">
              {tab}
            </span>
          </button>
        ))}
      </div>
      <section className="mt-12 min-h-screen">
        {selectedTab === "상세 설명" && (
          <DetailInfo detailImage={detailImage} />
        )}
        {selectedTab === "교환/반품" && <RefundOrReturn />}
        {selectedTab === "주의사항" && <CautionNotice />}
      </section>
    </div>
  );
};

export default ProductInfoNav;
