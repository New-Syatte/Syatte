import TopBanner from "@/app/(education)/education/TopBanner";
import { client } from "@/services/sanity";
import EducationSlider from "./EducationSlider";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import Button from "@/components/button/Button";
import Motion from "@/components/motion/Motion";
import { Course } from "@/type/edu";

// 교육 과정 목록을 가져오는 쿼리
const coursesQuery = `*[_type == "course"] {
  _id,
  category,
  name,
  startDate,
  endDate,
  schedule,
  fee
}`;

export default async function Page() {
  // 교육 과정 데이터 가져오기
  const courses = await client.fetch<Course[]>(coursesQuery);

  const motionTop = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
  };

  const motionCenter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };

  const motionBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.7,
      },
    },
  };

  const motionSlid = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.9,
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1,
      },
    },
  };

  return (
    <main className="font-kor overflow-x-hidden">
      <TopBanner />
      <Motion initial="hidden" whileInView="visible" variants={container}>
        <div
          className={
            "w-full h-[1140px] sm:h-full flex flex-col justify-center items-center pt-24 bg-bgGray"
          }
        >
          <Motion initial="hidden" whileInView="visible" variants={motionTop}>
            <span
              className={
                "flex text-center text-black text-2xl sm:text-base font-normal font-garamond tracking-widest sm:tracking-normal"
              }
            >
              PACKAGE PROGRAM
            </span>
          </Motion>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionCenter}
          >
            <span
              className={
                "flex mt-4 sm:mt-1 text-center text-black text-6xl sm:text-3xl font-black font-NotoSansKR"
              }
            >
              패키지 교육 과정
            </span>
          </Motion>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionBottom}
          >
            <span
              className={
                "flex mx-auto justify-center mt-7 w-[851px] sm:w-[84%] text-center text-black text-lg sm:text-sm font-normal font-helvetica leading-[30px] sm:leading-normal mb-12"
              }
            >
              다양한 과정은 패키지로 교육 받으실 수 있습니다. Aplicatior,
              Master, 그리고 <br className={"flex sm:hidden"} />
              One Day 등 다양한 프로그램이 운영되고 있습니다.
            </span>
          </Motion>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionSlid}
            style={{ display: "flex", width: "100%" }}
          >
            <EducationSlider
              courses={courses.filter((course: Course) =>
                ["applicator_class", "master_class", "plaster_class"].includes(
                  course.category,
                ),
              )}
            />
          </Motion>
        </div>
      </Motion>

      <div className="w-full flex flex-col justify-center items-center mb-40">
        <div className={"w-[90%] mt-44 flex flex-col items-center pb-12"}>
          <Motion initial="hidden" whileInView="visible" variants={motionTop}>
            <span
              className={
                "flex text-center text-black text-2xl sm:text-base font-normal font-garamond tracking-widest sm:mb-1 mb-5"
              }
            >
              SHORT COURSE
            </span>
          </Motion>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionCenter}
          >
            <span
              className={
                "flex text-center text-black sm:text-3xl text-6xl font-black font-NotoSansKR"
              }
            >
              단과 교육
            </span>
          </Motion>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionBottom}
          >
            <span
              className={
                "flex justify-center w-[851px] sm:w-auto mt-7 text-center text-black sm:text-sm text-lg font-normal font-helvetica sm:leading-normal leading-[30px]"
              }
            >
              단과 교육은 짧은 기간 동안에도 효과적인 학습을 제공하는
              프로그램으로, <br className={"flex sm:hidden"} />
              명확한 목표를 가지고 집중적으로 학습하고자 하는 분들에게 적합니다
            </span>
          </Motion>
        </div>
        <Motion
          initial="hidden"
          whileInView="visible"
          variants={container}
          className={"flex flex-col justify-center"}
        >
          <div className={"pt-12"}>
            <div
              className={
                "sm:w-[90%] w-4/6 mx-auto flex items-center justify-center gap-4 sm:space-x-0 space-x-5 flex-wrap"
              }
            >
              {courses
                .filter((course: Course) =>
                  ["vintage_class", "one_day_class"].includes(course.category),
                )
                .map((course: Course) => (
                  <EduProcessingCard key={course._id} course={course} />
                ))}
            </div>
          </div>
          <div className={"flex justify-center"}>
            <Button
              styleType="blank"
              style="flex justify-center mx-auto w-40 h-12 py-2 px-4 text-primaryBlue border border-primaryBlue rounded-full hover:bg-primaryBlue hover:text-white transition-all duration-300 ease-in-out"
            >
              더 보기
            </Button>
          </div>
        </Motion>
      </div>
    </main>
  );
}
