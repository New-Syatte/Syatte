"use client";
import Image from "next/image";

import IDPhoto from "@/assets/greetings/greeting-photo.png";
import award1 from "@/assets/greetings/award1.jpg";
import award2 from "@/assets/greetings/award2.jpg";
import award3 from "@/assets/greetings/award3.jpg";
import award4 from "@/assets/greetings/award4.jpg";
import award5 from "@/assets/greetings/award5.jpg";
import award6 from "@/assets/greetings/award6.jpg";
import award7 from "@/assets/greetings/award7.jpg";
import award8 from "@/assets/greetings/award8.jpg";
import award9 from "@/assets/greetings/award9.jpg";
import media1 from "@/assets/greetings/media1.png";
import media2 from "@/assets/greetings/media2.png";
import media3 from "@/assets/greetings/media3.png";
import media4 from "@/assets/greetings/media4.jpg";
import media5 from "@/assets/greetings/media5.jpg";

import { motion } from "framer-motion";

const GreetingClient = () => {
  const awards = [
    award1,
    award2,
    award3,
    award4,
    award5,
    award6,
    award7,
    award8,
    award9,
  ];
  const medias = [media1, media2, media3, media4, media5];

  const container = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const li = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn" } },
  };

  const liStyle =
    "block w-[480px] h-11 font-medium bg-bgGray py-2 rounded-full px-4 before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-primaryBlue flex items-center gap-2";

  const resumeText = [
    "1998 수채화 교육장 개설",
    "2002 칼헤인즈 마블페인팅 수료",
    "2009 미국 모던마스터즈 어플리케이터 수료",
    "2010 미국 모던마스터즈 어플리케이터 수료",
    "2010 미국 어메리칸클레이 어플리케이터 수료",
    "2011 미국 모던마스터즈 어플리케이터 수료",
    "2013 미국 모던마스터즈 어드밴스드 수료",
    "2013 스페셜페인팅 민간자격등록(2013-1086)",
    "2018 호주 포터스페인트 디테일스킬 수료",
    "2018 포페인팅 민간자격 명칭변경(2013-1086)",
    "2021 피엘핀켈스테인 우드/마블 페인팅 수료",
    "2023 독일 마이다스메탈 어플리케이터 수료",
    "2023 이태리 노바컬러 어드밴스드클래스 수료",
  ];

  const spanStyle =
    "relative sm:text-5xl text-6xl before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-slate-300 before:absolute before:top-0 before:left-1/2 before:-translate-y-[230%]";

  return (
    <main className="font-kor overflow-hidden relative z-30 flex flex-col items-center sm:w-screen w-full sm:p-8 px-64 pt-[100px]">
      <div className="h-full w-full flex sm:flex-col gap-10 2xl:gap-60 sm:justify-center sm:items-center items-stretch justify-evenly sm:my-24 mt-0">
        <motion.div
          className="flex"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            transition: { delay: 0.2 },
            y: 0,
          }}
          viewport={{ once: true }}
        >
          <div className=" flex flex-col justify-center items-center sm:w-full w-[425px] sm:h-full h-[640px] sm:ml-0 ml-14">
            <div className="flex justify-center sm:w-2/2 w-full sm:h-auto h-[547px] relative mb-12">
              <Image
                src={IDPhoto}
                alt="IDphoto"
                sizes="100vh"
                className="w-full h-full my-auto sm:rounded-[36px] rounded-[92px]"
              />
            </div>
            <p className="sm:text-xs text-sm text-center text-darkGray">
              E-Mail : 이메일@gmail.com <br /> Kakaotalk : @카카오톡ID
            </p>
          </div>
        </motion.div>
        <motion.div
          className="flex pt-[60px]"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            transition: { delay: 0.4 },
            y: 0,
          }}
          viewport={{ once: true }}
        >
          <div className="w-full sm:w-full sm:flex block flex-col items-center">
            <h2 className="sm:text-sm text-3xl font-bold mb-2 ml-1">CEO</h2>
            <h2 className="sm:text-3xl text-5xl font-bold tracking-tighter mb-8">
              이주연
            </h2>
            <h2 className="self-start font-GmarketSans sm:text-4xl text-[40px] leading-[52px] font-medium mt-10 sm:mb-6 mb-8 whitespace-nowrap">
              <span className={spanStyle}>샤</span>
              <span className={spanStyle}>뜨</span>와
              <span className={spanStyle}>함</span>
              <span className={spanStyle}>께</span>
              하세요
            </h2>
            <p className="flex w-full sm:text-sm text-lg">
              모던마스터스는 세계 1위의 고급 페인트 공급사로서 메탈릭 페인트,
              부식효과 페인트, 건축 외부용 페인트, 테마 페인트, 블랙라이트
              페인트, 글레이즈, 바니쉬, 크랙클 페인트, 건축용 기능성 페인트,
              DIY, 건축용 도료, 장식용 페인트 등 수성 페인트 전문 업체입니다.
              <br />
              <br />
              모던마스터스는 세계 1위의 고급 페인트 공급사로서 메탈릭 페인트,
              부식효과 페인트, 건축 외부용 페인트, 테마 페인트, 블랙라이트
              페인트, 글레이즈, 바니쉬, 크랙클 페인트, 건축용 기능성 페인트,
              DIY, 건축용 도료, 장식용 페인트 등 수성 페인트 전문 업체입니다.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-full relative mb-32 mt-[100px] sm:mt-[20px]"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true }}
      >
        <SemiTitle
          title="주요이력"
          desc="국내외 최고의 기관에서 교육 과정을 수료하였습니다."
        />
        <ul className="sm:text-xs text-lg 2xl:h-[440px] flex flex-wrap gap-2">
          {resumeText.map((text, index) => (
            <motion.li key={index} variants={li} className={liStyle}>
              {text}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="flex flex-col justify-start w-full mb-14"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true }}
      >
        <SemiTitle
          title="수상내역"
          desc="국내외 최고의 기관에서 교육 과정을 수료하였습니다."
        />
        <div className="flex flex-wrap sm:gap-x-5 sm:gap-y-2 gap-5 w-full">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={li}
              whileHover={{
                scale: 1.04,
                zIndex: 1,
                transition: { delay: 0 },
              }}
              className="p-3 sm:p-1 sm:w-1/4 sm:h-auto w-40 rounded-md flex items-center justify-center bg-[#f2f2f2] border border-[#f2f2f2] cursor-pointer"
            >
              <Image
                key={index}
                src={award}
                alt="award"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-start w-full mb-[250px]"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true }}
      >
        <SemiTitle
          title="미디어"
          desc="국내 TV, 라디오, 유튜브 프로그램에 출연하였습니다."
        />
        <div className="flex flex-wrap sm:gap-x-5 sm:gap-y-2 gap-5 w-full">
          {medias.map((media, index) => (
            <motion.div
              className="relative sm:w-1/4 sm:h-auto w-40 h-40 rounded-md"
              key={index}
              variants={li}
              whileHover={{
                scale: 1.04,
                zIndex: 1,
                transition: { delay: 0 },
              }}
            >
              <Image
                key={index}
                src={media}
                alt="media"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="rounded-[4px] cursor-pointer"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default GreetingClient;

const SemiTitle = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex justify-start items-center mb-7 sm:gap-3 gap-4">
      <div className="flex bg-primaryBlue sm:w-[6px] w-[6px] sm:h-[70px] h-20 lg:h-14" />
      <div className="inline-flex flex-col justify-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="sm:text-sm text-lg">{desc}</p>
      </div>
    </div>
  );
};
