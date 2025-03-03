"use client";

import { EduReservation } from "@/type/edu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";

interface EducationHistoryListProps {
  reservations: EduReservation[];
}

// 상태에 따른 배지 색상 및 텍스트
const statusBadge = {
  pending: { bg: "bg-[#FFCE85]", text: "text-[#BA7100]", label: "승인 대기중" },
  confirmed: { bg: "bg-[#85DAFF]", text: "text-[#006CBA]", label: "신청 완료" },
  cancelled: { bg: "bg-[#FFAB9F]", text: "text-[#BF462C]", label: "취소됨" },
};

export default function EducationHistoryList({
  reservations,
}: EducationHistoryListProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  // 기간에 따른 필터링 (현재는 모든 내역 표시)
  const filteredReservations = reservations;

  if (filteredReservations.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-gray-500">
        <p className="text-xl mb-4">교육 신청 내역이 없습니다.</p>
        <Link
          href="/education"
          className="px-6 py-2 bg-primaryBlue text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          교육 과정 보러가기
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {filteredReservations.map(reservation => {
        const { class: classInfo, status } = reservation;

        // classInfo가 없는 경우 처리
        if (!classInfo) {
          return (
            <div
              key={reservation._id || `error-${reservation.userName}`}
              className="mb-8 border border-gray-200 rounded-lg overflow-hidden p-6"
            >
              <p className="text-red-500">교육 정보를 불러올 수 없습니다.</p>
              <p className="text-sm text-gray-600">
                신청자: {reservation.userName}
              </p>
              <p className="text-sm text-gray-600">
                상태: {statusBadge[status]?.label || status}
              </p>
            </div>
          );
        }

        const badge = statusBadge[status] || {
          bg: "bg-gray-200",
          text: "text-gray-700",
          label: "상태 미확인",
        };
        const isEnded = classInfo.endDate
          ? new Date(classInfo.endDate) < new Date()
          : false;

        return (
          <div
            key={reservation._id || `${classInfo._id}-${reservation.userName}`}
            className="mb-8 border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="p-6 flex flex-col md:flex-row gap-6">
              {/* 이미지 섹션 */}
              <div className="relative w-full md:w-1/4 h-48 rounded-lg overflow-hidden">
                <Image
                  src={classInfo.image || "/images/default.webp"}
                  alt={classInfo.name}
                  fill
                  className="object-cover"
                />
                {isEnded && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white px-4 py-2 rounded-lg font-bold">
                      종료
                    </span>
                  </div>
                )}
              </div>

              {/* 정보 섹션 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-primaryBlue text-white text-xs px-2 py-1 rounded-lg">
                    {classInfo.category === "one_day_class"
                      ? "원데이 클래스"
                      : classInfo.category || "기타"}
                  </span>
                  <span
                    className={`${badge.bg} ${badge.text} text-xs px-2 py-1 rounded-lg`}
                  >
                    {badge.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {classInfo.name || "제목 없음"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <p>
                      <span className="font-semibold">신청자:</span>{" "}
                      {reservation.userName || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">연락처:</span>{" "}
                      {reservation.phone || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">소속:</span>{" "}
                      {reservation.company || "-"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">교육 기간:</span>{" "}
                      {classInfo.startDate
                        ? formatDate(classInfo.startDate)
                        : "-"}{" "}
                      ~{" "}
                      {classInfo.endDate ? formatDate(classInfo.endDate) : "-"}
                    </p>
                    <p>
                      <span className="font-semibold">교육 일정:</span>{" "}
                      {classInfo.schedule || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">교육 장소:</span>{" "}
                      {classInfo.location || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">교육비:</span>{" "}
                      {classInfo.fee ? formatPrice(classInfo.fee) + "원" : "-"}
                    </p>
                  </div>
                </div>

                {/* 버튼 섹션 */}
                <div className="mt-4 flex gap-2 justify-end">
                  {classInfo._id && (
                    <Link
                      href={`/education/${classInfo._id}`}
                      className="px-4 py-2 border border-primaryBlue text-primaryBlue rounded-full hover:bg-primaryBlue hover:text-white transition-colors"
                    >
                      교육 상세보기
                    </Link>
                  )}
                  {status !== "cancelled" && !isEnded && (
                    <button
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      onClick={() => {
                        // 취소 기능 구현 (추후 추가)
                        alert(
                          "교육 취소 기능은 준비 중입니다. 관리자에게 문의해주세요.",
                        );
                      }}
                    >
                      신청 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
