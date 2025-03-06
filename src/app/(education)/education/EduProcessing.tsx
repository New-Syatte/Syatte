import { Course } from "@/type/edu";
import { client } from "@/services/sanity";
import { groq } from "next-sanity";
import EduProcessingCard from "./EduProcessingCard";

async function EduProcessing() {
  try {
    // 현재 날짜를 YYYY-MM-DD 형식으로 변환
    const today = new Date().toISOString().split("T")[0];

    const processingQuery = groq`*[_type == "course" && count(classes) > 0] {
      _id,
      name,
      description,
      "classes": *[_type == "classSchema" && _id in ^.classes[]._ref] {
        _id,
        name,
        category,
        startDate,
        endDate,
        schedule,
        fee,
        location,
        details
      }
    }`;

    const courses = await client.fetch<Course[]>(processingQuery);

    if (!courses || courses.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">현재 진행 중인 교육이 없습니다.</p>
        </div>
      );
    }

    // 현재 진행 중이거나 예정된 교육만 필터링
    const activeCourses = courses.filter((course: Course) => {
      if (!course.classes || course.classes.length === 0) return false;

      const lastClass = course.classes[course.classes.length - 1];
      return new Date(lastClass.endDate) >= new Date(today);
    });

    if (activeCourses.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">현재 진행 중인 교육이 없습니다.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCourses.map((course: Course) => (
          <EduProcessingCard key={course._id} course={course} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("교육 데이터 로딩 중 오류 발생:", error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          교육 정보를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="text-gray-500 mt-2">잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }
}

export default EduProcessing;
