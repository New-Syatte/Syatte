import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import { client } from "@/services/sanity";
import { Course } from "@/type/edu";

const processingQuery = `*[_type == "course" && startDate > now()] {
  _id,
  name,
  fee,
  startDate,
  endDate,
  schedule,
  location
}`;

export default async function EduProcessing() {
  const courses = await client.fetch<Course[]>(processingQuery);

  return (
    <section className={"mx-auto w-[70vw] "}>
      <p className={"text-[60px] font-bold text-center"}>진행중인 교육</p>
      <div className={"divider mt-[116px]"} />
      <div className={"mt-[48px]"} />
      <div className={"flex flex-wrap w-[1200px] gap-[34px]"}>
        {courses.map(course => (
          <EduProcessingCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
}
