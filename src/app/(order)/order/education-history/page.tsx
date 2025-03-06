import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import Heading from "@/components/heading/Heading";
import { EduReservation } from "@/type/edu";
import { client } from "@/services/sanity";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import EducationHistoryList from "./EducationHistoryList";

// 사용자의 교육 신청 내역을 가져오는 쿼리
const getEducationReservations = async (email: string) => {
  const query = `*[_type == "edu-reservation" && email == $email] {
    _id,
    userName,
    email,
    phone,
    company,
    status,
    "class": *[_type == "classSchema" && _id == ^.class._ref][0] {
      _id,
      name,
      category,
      startDate,
      endDate,
      price,
      capacity,
      location,
      description
    },
    createdAt
  } | order(createdAt desc)`;

  return client.fetch<EduReservation[]>(query, { email });
};

export default async function EducationHistory() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-4">로그인이 필요합니다</h2>
        <p>교육 예약 내역을 확인하려면 로그인해주세요.</p>
      </div>
    );
  }

  const reservations = await getEducationReservations(session.user.email);

  return (
    <div className="flex flex-col w-full gap-10 sm:gap-5 mb-20">
      <Heading title="교육 신청 내역" />
      <div className="flex flex-col w-full gap-10 sm:gap-5">
        <PeriodSelector />
        <EducationHistoryList reservations={reservations} />
      </div>
    </div>
  );
}

