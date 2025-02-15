import { Course } from "@/type/edu";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Edu01 from "@/assets/education/edu-0.jpg";

interface EduProcessingCardProps {
  course: Course;
}

const categoryMap = {
  applicator_class: "A/C (Applicator Class)",
  master_class: "M/C (Master Class)",
  plaster_class: "Plaster Class",
  vintage_class: "Vintage Class",
  one_day_class: "One Day Class",
};

const EduProcessingCard = ({ course }: EduProcessingCardProps) => {
  const { _id, name, startDate, endDate, schedule, fee } = course;

  return (
    <Link
      href={`/education/reserve?courseId=${_id}`}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 hover:border-primary"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <p>
            {formatDate(startDate)} ~ {formatDate(endDate)}
          </p>
          <p>{schedule}</p>
          <p>{formatPrice(fee)}원</p>
        </div>
      </div>
    </Link>
  );
};

export default EduProcessingCard;
