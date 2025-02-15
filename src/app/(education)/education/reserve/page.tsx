import { client } from "@/services/sanity";
import ReservationClient from "./ReservationClient";

const courseQuery = `*[_type == "course" && _id == $id][0] {
  _id,
  name,
  fee,
  startDate,
  endDate,
  schedule,
  location
}`;

interface PageProps {
  searchParams: { courseId: string };
}

export default async function EducationReservePage({
  searchParams,
}: PageProps) {
  const { courseId } = searchParams;

  const course = await client.fetch(
    courseQuery,
    { id: courseId },
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
    <div className="w-[80%] mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">교육 신청</h1>
      <div className="bg-white p-8 rounded-lg w-full flex justify-center items-center">
        <ReservationClient course={course} />
      </div>
    </div>
  );
}
