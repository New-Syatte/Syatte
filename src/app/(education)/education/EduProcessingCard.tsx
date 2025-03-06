import { Course } from "@/type/edu";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";
import Link from "next/link";

interface EduProcessingCardProps {
  course: Course;
}

const EduProcessingCard = ({ course }: EduProcessingCardProps) => {
  const { _id, name, classes } = course;
  const mainClass = classes[0]; // 단일 클래스 과정이므로 첫 번째 클래스 사용

  return (
    <Link
      href={`/education/${mainClass._id}`}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 hover:border-primary"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <p>
            {formatDate(mainClass.startDate)} ~ {formatDate(mainClass.endDate)}
          </p>
          <p>{mainClass.schedule}</p>
          <p>{formatPrice(mainClass.fee)}원</p>
        </div>
      </div>
    </Link>
  );
};

export default EduProcessingCard;
