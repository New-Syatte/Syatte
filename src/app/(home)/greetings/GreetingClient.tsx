"use client";
import Image from "next/image";

import IDPhoto from "@/assets/greetings/greeting-photo.png";
import clip from "@/assets/greetings/photo-clip.svg";
import band from "@/assets/greetings/band-removebg.png";
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
import media4 from "@/assets/greetings/media4.png";
import media5 from "@/assets/greetings/media5.png";

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
        ease: "easeIn",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const li = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn" } },
  };

  const hover = {
    width: "300px", // 244px * 1.2
    height: "200px", // 166px * 1.2
    zIndex: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
  };

  const spanStyle =
    "relative text-6xl before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-slate-300 before:absolute before: before:-top-5 before:left-1/2 before:transform before:-translate-y-1/2";

  return (
    <div className="relative z-30 flex flex-col items-center w-full p-64">
      <motion.div
        className="2xl:h-[750px] lg:h-auto w-full 2xl:flex gap-60 justify-between lg:block"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1, ease: "easeIn" },
          y: 0,
        }}
        viewport={{ once: true }}
      >
        <div className="w-[425px] h-[640px] ml-14">
          <div className="w-full h-[547px] relative mb-12 rounded-sm">
            <Image src={IDPhoto} alt="IDphoto" fill={true} />
            <Image
              src={clip}
              alt="clip"
              width={238}
              height={238}
              style={{ objectFit: "contain" }}
              className="absolute -bottom-[84px] -right-[84px]"
            />
          </div>
          <p className="text-sm">
            E-Mail : 이메일@gmail.com <br /> Kakaotalk : @카카오톡ID
          </p>
        </div>
        <div className="w-1/2">
          <h2 className="text-[40px] leading-[52px] font-medium mt-10 mb-[72px] whitespace-nowrap">
            <span className={spanStyle}>샤</span>
            <span className={spanStyle}>뜨</span>와
            <span className={spanStyle}>함</span>
            <span className={spanStyle}>께</span>
            하세요
          </h2>
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-2 ml-1">CEO</h2>
            <h2 className="text-5xl font-bold tracking-tighter mb-8">이주연</h2>
            <p className="text-lg">
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
        </div>
      </motion.div>
      <motion.div
        className="w-full h-[342px] bg-bgGray border border-[#e4e4e4] relative rounded-[4px] mb-32"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true }}
      >
        <Image
          className="rotate-[41deg] absolute -top-4 -right-12 opacity-80"
          src={band}
          alt="band"
          width={127}
          height={57}
        />
        <div className="flex p-10 pr-28 justify-start items-center w-full h-full gap-60">
          <div className="flex gap-9 justify-start items-start h-full">
            <div className="bg-[#9BB5B5] w-[6px] h-full" />
            <ul className="text-lg flex flex-col gap-2">
              <motion.li variants={li}>1998 수채화 교육장 개설</motion.li>
              <motion.li variants={li}>2002 칼헤인즈 마블페인팅 수료</motion.li>
              <motion.li variants={li}>
                2009 미국 모던마스터즈 어플리케이터 수료
              </motion.li>
              <motion.li variants={li}>
                2010 미국 모던마스터즈 어플리케이터 수료
              </motion.li>
              <motion.li variants={li}>
                2010 미국 어메리칸클레이 어플리케이터 수료
              </motion.li>
              <motion.li variants={li}>
                2011 미국 모던마스터즈 어플리케이터 수료
              </motion.li>
              <motion.li variants={li}>
                2013 미국 모던마스터즈 어드밴스드 수료
              </motion.li>
            </ul>
          </div>
          <div className="flex gap-9 justify-start items-start h-full">
            <div className="bg-[#9BB5B5] w-[6px] h-full" />
            <ul className="text-lg flex flex-col gap-2">
              <motion.li variants={li}>
                2013 스페셜페인팅 민간자격등록(2013-1086)
              </motion.li>
              <motion.li variants={li}>
                2018 호주 포터스페인트 디테일스킬 수료
              </motion.li>
              <motion.li variants={li}>
                2018 포페인팅 민간자격 명칭변경(2013-1086)
              </motion.li>
              <motion.li variants={li}>
                2021 피엘핀켈스테인 우드/마블 페인팅 수료
              </motion.li>
              <motion.li variants={li}>
                2023 독일 마이다스메탈 어플리케이터 수료
              </motion.li>
              <motion.li variants={li}>
                2023 이태리 노바컬러 어드밴스드클래스 수료
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-start w-full mb-24"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-2">수료증</h2>
        <p className="text-lg mb-6">
          국내외 최고의 기관에서 교육 관정을 수료하였습니다.
        </p>
        <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6 2xl:w-[912px] lg:w-[600px] md:w-[300px]">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={li}
              whileHover={{
                scale: 1.3,
                zIndex: 1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="relative w-60 h-60"
            >
              <Image
                src={award}
                alt="award"
                fill
                className="rounded-sm"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-start w-full"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-2">미디어 출연</h2>
        <p className="text-lg mb-6">
          국내 다양한 TV, 라디오, 유튜브에 프로그램에 출연하였습니다.
        </p>
        <div className="flex flex-wrap w-[820px] gap-3">
          {medias.map((media, index) => (
            <motion.div
              className="relative w-[244px] h-[166px]"
              key={index}
              variants={li}
              whileHover={hover}
            >
              <Image
                key={index}
                src={media}
                alt="media"
                fill={true}
                className="rounded-[4px]"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GreetingClient;
