import { client } from "@/services/sanity";
import { ClassSchema } from "@/type/edu";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 클래스 정보를 가져오는 쿼리
const classQuery = `*[_type == "classSchema" && _id == $id][0] {
  _id,
  name,
  category,
  startDate,
  endDate,
  schedule,
  fee,
  location,
  details,
  image,
  "image": image.asset->url,
  detailImage,
  "detailImage": detailImage.asset->url
}`;

interface PageProps {
  params: Promise<{ details: string }>;
}

// 페이지 컴포넌트
export default async function ClassDetailsPage({ params }: PageProps) {
  const { details: classId } = await params;

  const classData = await client.fetch<ClassSchema>(
    classQuery,
    { id: classId },
    {
      next: {
        revalidate: 36000,
      },
    },
  );

  if (!classData) {
    return <div>클래스 정보를 찾을 수 없습니다.</div>;
  }

  const isExpired = new Date(classData.endDate) < new Date();

  return (
    <section className="w-full mx-auto mb-[200px] flex sm:flex-col justify-center sm:items-center items-start sm:px-0 px-60 py-20 gap-28 overflow-x-hidden">
      <div className="flex flex-col justify-center items-center sm:w-[90%] w-[415px]">
        {/* 이미지 섹션 */}
        <div className="flex justify-center items-center sm:w-[90%] w-[415px] h-[302px] bg-zinc-100 rounded border border-zinc-400">
          {classData.image ? (
            <Image
              src={classData.image}
              alt={classData.name}
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

        {/* 클래스 정보 */}
        <div className="mt-8">
          <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm mb-4">
            {categoryMap[classData.category as keyof typeof categoryMap] ||
              "기타"}
          </span>
          <h2 className="text-neutral-800 text-3xl font-bold mb-5">
            {classData.name}
          </h2>
        </div>

        {/* 교육 정보 그리드 */}
        <div className="grid grid-cols-1 gap-8 mb-8 mt-8 w-full">
          <div className="space-y-6 py-6 font-helvetica">
            <div className="border-y border-zinc-400 py-4 flex flex-col justify-between items-start gap-2 px-4">
              <div className="flex gap-9 items-center">
                <h3 className="font-bold">일정</h3>
                <p className="text-gray-700">
                  {formatDateSafely(classData.startDate, "yyyy. MM. dd")} ~{" "}
                  {formatDateSafely(classData.endDate, "MM. dd.")}
                  <br />
                  <span className="text-primary">
                    {classData.schedule ? ` (${classData.schedule})` : ""}
                  </span>
                </p>
              </div>
              <div className="flex gap-9 items-center">
                <h3 className="font-bold">장소</h3>
                <p className="text-gray-700">{classData.location || "미정"}</p>
              </div>
            </div>
            <div className="flex gap-9 items-center pt-9 justify-between">
              <h3 className="text-xl font-bold">수강료</h3>
              <p className="text-primary text-xl font-bold">
                {classData.fee.toLocaleString()}원
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
            <Link href={`/education/reserve?classId=${classData._id}`}>
              <button className="w-[400px] h-[62px] bg-primaryBlue text-white text-lg font-bold rounded-[50px] hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2 transition-all">
                교육 신청하기
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* 상세 이미지 */}
      <article className="w-full">
        {classData.detailImage ? (
          <div className="w-full">
            <Image
              src={classData.detailImage}
              alt="교육 상세 정보"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500 text-lg">상세 이미지 준비중입니다.</p>
          </div>
        )}
      </article>
    </section>
  );
}

const categoryMap = {
  applicator_class: "A/C (Applicator Class)",
  master_class: "M/C (Master Class)",
  plaster_class: "Plaster Class",
  vintage_class: "Vintage Class",
  one_day_class: "One Day Class",
};

// 날짜 포맷팅 에러 처리
const formatDateSafely = (dateStr: string, formatStr: string) => {
  try {
    return format(new Date(dateStr), formatStr, { locale: ko });
  } catch (error) {
    console.error("날짜 포맷팅 오류:", error);
    return "날짜 정보 없음";
  }
};
