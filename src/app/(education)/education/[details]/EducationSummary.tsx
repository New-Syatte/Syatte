import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/type/edu";

interface EducationSummaryProps {
  course: Course;
}

const categoryMap = {
  applicator_class: "A/C (Applicator Class)",
  master_class: "M/C (Master Class)",
  plaster_class: "Plaster Class",
  vintage_class: "Vintage Class",
  one_day_class: "One Day Class",
};

const EducationSummary = ({ course }: EducationSummaryProps) => {
  if (!course.classes || course.classes.length === 0) {
    return (
      <div className="text-center text-red-500">
        클래스 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const firstClass = course.classes[0];
  const lastClass = course.classes[course.classes.length - 1];
  const totalFee = course.classes.reduce((sum, cls) => sum + cls.fee, 0);

  // 날짜 포맷팅 에러 처리
  const formatDateSafely = (dateStr: string, formatStr: string) => {
    try {
      return format(new Date(dateStr), formatStr, { locale: ko });
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return "날짜 정보 없음";
    }
  };

  // 현재 날짜 기준으로 종료 여부 확인
  const now = new Date();
  const isExpired = new Date(lastClass.endDate) < now;

  return (
    <div className="flex flex-col justify-center items-center sm:w-[90%] w-[415px]">
      {/* 이미지 섹션 */}
      <div className="flex justify-center items-center sm:w-[90%] w-[415px] h-[302px] bg-zinc-100 rounded border border-zinc-400">
        {firstClass.image ? (
          <Image
            src={firstClass.image}
            alt={course.name}
            className="object-cover w-full h-full"
            width={415}
            height={300}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <Image
              src="/images/education-placeholder.webp"
              alt="이미지 준비중"
              className="object-cover w-full h-full opacity-30 absolute"
              width={415}
              height={300}
            />
            <p className="mt-4 text-xl font-medium text-gray-500">
              이미지 준비중입니다
            </p>
          </div>
        )}
      </div>

      {/* 제목 및 설명 */}
      <div className="mt-8">
        <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm mb-4">
          {categoryMap[firstClass.category as keyof typeof categoryMap] ||
            "기타"}
        </span>
        <h2 className="text-neutral-800 text-3xl font-bold mb-5">
          {course.name}
        </h2>
        <div className="text-neutral-800 text-sm font-normal sm:leading-normal leading-[25.20px]">
          {course.description ? (
            <PortableText value={course.description} />
          ) : (
            <p>교육 설명이 준비중입니다.</p>
          )}
        </div>
      </div>

      {/* 교육 정보 그리드 */}
      <div className="grid grid-cols-1 gap-8 mb-8 mt-8">
        <div className="space-y-6 py-6 font-helvetica">
          <div className="border-y border-zinc-400 py-4 flex flex-col justify-between items-start gap-2 px-4">
            <div className="flex gap-9 items-center">
              <h3 className="font-bold">일정</h3>
              <p className="text-gray-700">
                {formatDateSafely(firstClass.startDate, "yyyy. MM. dd")} ~{" "}
                {formatDateSafely(lastClass.endDate, "MM. dd.")}
                <span className="text-primary">
                  {firstClass.schedule ? ` (${firstClass.schedule})` : ""}
                </span>
              </p>
            </div>
            <div className="flex gap-9 items-center">
              <h3 className="font-bold">장소</h3>
              <p className="text-gray-700">{firstClass.location || "미정"}</p>
            </div>
          </div>
          <div className="flex gap-9 items-center pt-9 justify-between">
            <h3 className="text-xl font-bold">수강료</h3>
            <p className="text-primary text-xl font-bold">
              {totalFee.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>

      {/* 예약 버튼 */}
      <div className="flex justify-center mt-8">
        {isExpired ? (
          <button
            disabled
            className="w-[400px] h-[62px] bg-gray-400 text-white text-lg font-bold rounded-[50px] cursor-not-allowed"
          >
            종료된 교육입니다
          </button>
        ) : (
          <Link href={`/education/reserve?classId=${firstClass._id}`}>
            <button className="w-[400px] h-[62px] bg-primaryBlue text-white text-lg font-bold rounded-[50px] hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2 transition-all">
              교육 신청하기
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EducationSummary;
