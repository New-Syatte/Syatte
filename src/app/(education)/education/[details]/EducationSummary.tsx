import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";

interface Course {
  _id: string;
  category: string;
  name: string;
  details: any;
  startDate: string;
  endDate: string;
  schedule: string;
  fee: number;
  image?: string;
  detailImage?: string;
  location: string;
}

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
  return (
    <div className="flex flex-col justify-center items-center sm:w-[90%] w-[415px]">
      {/* 이미지 섹션 */}
      <div className="flex justify-center items-center sm:w-[90%] w-[415px] h-[302px] bg-zinc-100 rounded border border-zinc-400">
        {course.image ? (
          <Image
            src={course.image}
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

      <div className="w-full">
        {/* 제목 및 설명 */}
        <div className="mt-8">
          <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm mb-4">
            {categoryMap[course.category as keyof typeof categoryMap]}
          </span>
          <h2 className="text-neutral-800 text-3xl font-bold mb-5">
            {course.name}
          </h2>
          <div className="text-neutral-800 text-sm font-normal sm:leading-normal leading-[25.20px]">
            <PortableText value={course.details} />
          </div>
        </div>

        {/* 교육 정보 그리드 */}
        <div className="grid grid-cols-1 gap-8 mb-8 mt-8">
          <div className="space-y-6 py-6 font-helvetica">
            <div className="border-y border-zinc-400 py-4 flex flex-col justify-between items-start gap-2 px-4">
              <div className="flex gap-9 items-center">
                <h3 className="font-bold">일정</h3>
                <p className="text-gray-700">
                  {format(new Date(course.startDate), "yyyy. MM. dd", {
                    locale: ko,
                  })}{" "}
                  ~{" "}
                  {format(new Date(course.endDate), "MM. dd.", {
                    locale: ko,
                  })}
                  <span className="text-primary">
                    {" (" + course.schedule + ")"}
                  </span>
                </p>
              </div>
              <div className="flex gap-9 items-center">
                <h3 className="font-bold">장소</h3>
                <p className="text-gray-700">{course.location}</p>
              </div>
            </div>
            <div className="flex gap-9 items-center pt-9 justify-between">
              <h3 className="text-xl font-bold">수강료</h3>
              <p className="text-primary text-xl font-bold">
                {course.fee.toLocaleString() + "원"}
              </p>
            </div>
          </div>
        </div>

        {/* 예약 버튼 */}
        <div className="flex justify-center mt-8">
          <Link href={`/education/reserve?courseId=${course._id}`}>
            <button className="w-[400px] h-[62px] bg-primaryBlue text-white text-lg font-bold rounded-[50px] hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2 transition-all">
              교육 신청하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationSummary;
