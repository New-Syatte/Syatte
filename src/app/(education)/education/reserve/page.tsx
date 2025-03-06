import { client } from "@/services/sanity";
import ReservationClient from "./ReservationClient";

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
  "image": image.asset->url
}`;

export default async function EducationReservePage({
  searchParams,
}: {
  searchParams: Promise<{ classId: string }>;
}) {
  const { classId } = await searchParams;

  const classData = await client.fetch(
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

  return (
    <div className="w-[80%] mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">교육 신청</h1>
      <div className="bg-white p-8 rounded-lg w-full flex justify-center items-center">
        <ReservationClient classData={classData} />
      </div>
    </div>
  );
}
