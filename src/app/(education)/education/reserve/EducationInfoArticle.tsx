"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import priceFormat from "@/utils/priceFormat";
import { ClassSchema } from "@/type/edu";

interface EducationInfoArticleProps {
  classData: ClassSchema;
}

const EducationInfoArticle = ({ classData }: EducationInfoArticleProps) => {
  const startDate = format(new Date(classData.startDate), "yyyy년 MM월 dd일", {
    locale: ko,
  });
  const endDate = format(new Date(classData.endDate), "yyyy년 MM월 dd일", {
    locale: ko,
  });

  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold mb-6">교육 정보</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-24 text-gray-600">교육명</span>
          <span>{classData.name}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-gray-600">교육 기간</span>
          <span>
            {startDate} ~ {endDate}
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-gray-600">교육 시간</span>
          <span>{classData.schedule}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-gray-600">교육 장소</span>
          <span>{classData.location}</span>
        </div>
      </div>
      <div className="flex justify-between items-center border-t border-lightGray mt-6 pt-6">
        <h3 className="text-xl font-bold">결제 금액</h3>
        <div className="font-bold text-2xl flex items-end gap-1">
          <span>{priceFormat(classData.fee)}</span>
          <span className="text-lg">원</span>
        </div>
      </div>
    </div>
  );
};

export default EducationInfoArticle;
