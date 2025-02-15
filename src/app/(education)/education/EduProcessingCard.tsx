import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Edu01 from "@/assets/education/edu-0.jpg";

interface Course {
  _id: string;
  category: string;
  name: string;
  startDate: string;
  endDate: string;
  schedule: string;
  fee: string;
}

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
  return (
    <Link href={`/education/${course._id}`}>
      <div className="w-[384px] sm:w-full h-[384px] sm:h-[320px] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
        <div className="p-6">
          <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm mb-4">
            {categoryMap[course.category as keyof typeof categoryMap]}
          </span>
          <h3 className="text-xl font-bold mb-4">{course.name}</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              {format(new Date(course.startDate), "yyyy년 MM월 dd일", {
                locale: ko,
              })}{" "}
              ~{" "}
              {format(new Date(course.endDate), "yyyy년 MM월 dd일", {
                locale: ko,
              })}
            </p>
            <p>{course.schedule}</p>
            <p className="text-primary font-bold">{course.fee}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EduProcessingCard;
