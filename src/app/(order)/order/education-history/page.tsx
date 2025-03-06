import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import Heading from "@/components/heading/Heading";
import { EduReservation } from "@/type/edu";
import { client } from "@/services/sanity";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
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
      schedule,
      fee,
      location,
      "image": image.asset->url
    }
  } | order(class.startDate desc)`;

  return client.fetch(query, { email });
};

export default async function EducationHistory() {
  // 현재 로그인한 사용자 정보 가져오기
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";

  // 교육 신청 내역 가져오기
  const reservations: EduReservation[] = await getEducationReservations(email);

  return (
    <section className="w-full flex flex-col gap-y-20 sm:gap-y-10 font-kor">
      <div>
        <div className="flex justify-between sm:flex-col mb-[30px] sm:mb-10 sm:pb-4 border-b border-lightGray">
          <Heading title="교육 신청 내역" fontSize="3xl" />
          <PeriodSelector />
        </div>
        <EducationHistoryList reservations={reservations} />
      </div>
    </section>
  );
}
