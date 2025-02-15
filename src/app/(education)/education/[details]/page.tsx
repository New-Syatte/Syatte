import { client } from "@/services/sanity";
import EducationSummary from "./EducationSummary";
import Image from "next/image";

// 교육 과정 정보를 가져오는 쿼리
const courseQuery = `*[_type == "course" && _id == $id][0] {
  _id,
  category,
  name,
  details,
  startDate,
  endDate,
  schedule,
  fee,
  location,
  image,
  "image": image.asset->url,
  "detailImage": detailImage.asset->url,
}`;

interface PageProps {
  params: Promise<{ details: string }>;
}

// 페이지 컴포넌트
export default async function EducationDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { details } = resolvedParams;

  const course = await client.fetch(
    courseQuery,
    { id: details },
    {
      next: {
        revalidate: 36000,
      },
    },
  );

  if (!course) {
    return <div>교육 과정을 찾을 수 없습니다.</div>;
  }

  return (
    <section className="w-full mx-auto mb-[200px] flex sm:flex-col justify-center sm:items-center items-start sm:px-0 px-60 py-20 gap-28 overflow-x-hidden">
      <EducationSummary course={course} />
      <article className="w-full">
        {course.detailImage ? (
          <div className="w-full">
            <Image
              src={course.detailImage}
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
