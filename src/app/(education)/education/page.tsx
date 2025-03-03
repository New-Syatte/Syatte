import TopBanner from "@/app/(education)/education/TopBanner";
import { client } from "@/services/sanity";
import EducationSlider from "./EducationSlider";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import Button from "@/components/button/Button";
import Motion from "@/components/motion/Motion";
import { Course, ClassSchema } from "@/type/edu";
import Image from "next/image";
import Link from "next/link";

// 교육 과정 목록을 가져오는 쿼리
const coursesQuery = `*[_type == "course" && count(classes) > 0] {
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
    details,
    "image" : image.asset->url
  }
}`;

// 단과 교육(One Day Class) 클래스만 가져오는 쿼리
const oneDayClassQuery = `*[_type == "classSchema" && category == "one_day_class"] {
  _id,
  name,
  category,
  startDate,
  endDate,
  schedule,
  fee,
  location,
  details,
  "image" : image.asset->url,
  _createdAt
}`;

export default async function Page() {
  const courses = await client.fetch(coursesQuery);
  const oneDayClasses = await client.fetch(oneDayClassQuery);

  // 패키지 교육 (단일 클래스 과정 제외)
  const packageCourses = courses.filter(
    (course: Course) => course.classes && course.classes.length >= 1,
  );

  // 단과 교육 (One Day Class와 단일 클래스 과정)
  const singleCourses = courses.filter(
    (course: Course) =>
      course.classes &&
      course.classes.length === 1 &&
      course.classes[0].category === "one_day_class",
  );

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
              다양한 과정은 패키지로 교육 받으실 수 있습니다. Applicator,
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
            <EducationSlider courses={packageCourses} />
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
          className={"flex flex-col justify-center w-[70%] mx-auto"}
        >
          <div className={"pt-12"}>
            <div
              className={
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] mx-auto"
              }
            >
              {oneDayClasses.map((classItem: ClassSchema) => (
                <div
                  key={classItem._id}
                  className="bg-white rounded-lg overflow-hidden transition-shadow duration-300"
                >
                  <div className="relative h-52 rounded-lg overflow-hidden">
                    <Image
                      src={classItem.image || "/images/default.webp"}
                      alt={classItem.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                      priority={false}
                    />

                    {/* 종료된 클래스에 대한 오버레이 표시 */}
                    {(() => {
                      const today = new Date();
                      const endDate = new Date(classItem.endDate);

                      if (endDate < today) {
                        return (
                          <div className="absolute inset-0 bg-[#C3BBBB] bg-opacity-50 flex items-center justify-center">
                            <span className="bg-[#535151] text-white font-bold text-lg px-4 py-1 rounded-2xl">
                              종료
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>

                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {/* 모집중/종료 상태 표시 */}
                      {(() => {
                        const today = new Date();
                        const endDate = new Date(classItem.endDate);

                        if (endDate < today) {
                          return (
                            <span className="bg-[#FFAB9F] text-[#BF462C] font-bold text-xs px-2 py-1 rounded-lg">
                              종료
                            </span>
                          );
                        } else {
                          return (
                            <span className="bg-[#FFCE85] text-[#BA7100] font-bold text-xs px-2 py-1 rounded-lg">
                              모집중
                            </span>
                          );
                        }
                      })()}

                      {/* NEW 태그 독립적으로 표시 - 종료된 클래스에는 표시하지 않음 */}
                      {(() => {
                        const today = new Date();
                        const endDate = new Date(classItem.endDate);
                        const startDate = new Date(classItem.startDate);
                        const uploadDate = new Date(
                          classItem._createdAt || startDate,
                        );
                        const isNew =
                          (today.getTime() - uploadDate.getTime()) /
                            (1000 * 60 * 60 * 24) <
                          7;

                        // 종료된 클래스에는 NEW 태그를 표시하지 않음
                        if (isNew && endDate >= today) {
                          return (
                            <span className="bg-[#85DAFF] text-[#006CBA] font-bold text-xs px-2 py-1 rounded-lg">
                              NEW
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        {(classItem.details &&
                          classItem.details[0]?.children?.[0]?.text) ||
                          "상세 정보가 없습니다."}
                      </p>
                      <p>
                        {new Date(classItem.startDate).toLocaleDateString()} ~{" "}
                        {new Date(classItem.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/education/${classItem._id}`}
                      className="mt-4 block w-full text-center bg-white text-primaryBlue border border-primaryBlue rounded-full py-2 hover:bg-primaryBlue hover:text-white transition-colors duration-300"
                    >
                      신청하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className={"flex justify-center mt-10"}>
            <Button
              styleType="blank"
              style="flex justify-center mx-auto w-40 h-12 py-2 px-4 text-primaryBlue border border-primaryBlue rounded-full hover:bg-primaryBlue hover:text-white transition-all duration-300 ease-in-out"
            >
              더 보기
            </Button>
          </div> */}
        </Motion>
      </div>
    </main>
  );
}
