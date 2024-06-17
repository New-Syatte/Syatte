import Motion from "@/components/motion/Motion";
import EduDesignCard from "./EduDesignCard";

export default function TopBanner() {
  const Number1 = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };
  const Number2 = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };
  const Number3 = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
      },
    },
  };

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

  const motionOperate = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.9,
      },
    },
  };

  return (
    <section className="flex justify-center items-center">
      <div className="flex sm:flex-col justify-evenly items-center w-full sm:w-[84%] mb-24 px-36 pb-36 pt-20 sm:p-0 flex-wrap sm:flex-nowrap gap-11">
        <div className={"w-[33.0625rem] sm:w-full mt-[0px] sm:mt-[80px] flex-shrink-0"}>
          <div className="sm:text-center text-left">
            <Motion initial="hidden" whileInView="visible" variants={motionTop}>
              <p
                className={
                  "sm:text-base text-xl font-garamond tracking-widest text-black"
                }
              >
                EDUCATION
              </p>
            </Motion>
            <Motion
              initial="hidden"
              whileInView="visible"
              variants={motionCenter}
            >
              <p
                className={
                  "mt-[.875rem] sm:text-3xl text-6xl font-black text-black font-NotoSansKR"
                }
              >
                교육소개
              </p>
            </Motion>
          </div>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionBottom}
          >
            <div className="mt-[1.875rem] mb-14 text-[#5b5b5b] sm:text-sm text-lg font-light sm:font-normal leading-[1.875rem] sm:leading-normal">
              <p>
                창의적이고 특수한 기술을 활용하여 미술 작품이나 프로젝트를
                창조하고자 하는 이들을 위한 훌륭한 기회를 제공합니다. 다양한
                기법과 재료를 활용하여 특수한 효과와 아름다움을 창출하는 데
                필요한 기술을 습득하고, 창의적인 작업을 펼칠 수 있습니다.
              </p>
            </div>
          </Motion>
          <div
            className={
              "sm:flex hidden justify-start items-center flex-wrap gap-3"
            }
          >
            <EduDesignCard type="aplicatior" />
            <EduDesignCard type="master" />
            <EduDesignCard type="oneday" />
          </div>
          <Motion
            initial="hidden"
            whileInView="visible"
            variants={motionOperate}
          >
            <div
              className={
                "flex flex-col flex-wrap w-[33.0625rem] sm:w-full gap-4"
              }
            >
              <span
                className={
                  "mt-6 w-[20rem] sm:w-auto text-black text-[2.125rem] sm:text-xl font-bold"
                }
              >
                운영
              </span>

              <span
                className={
                  "sm:text-sm text-lg text-[#5b5b5b] font-light sm:font-normal sm:leading-normal leading-[1.875rem]"
                }
              >
                샤뜨는 다양한 교육과정을 제공하여 학습자들이 전문 기술을
                습득하고 성장할 수 있도록 지원하고 있습니다. 그 중에서도
                주목받는 교육과정으로는 Aplicatior, Master, One Day 프로그램이
                있습니다.
              </span>
            </div>
          </Motion>
        </div>
        <div
          className={
            "sm:hidden flex space-x-9 sm:space-x-0 justify-start items-center flex-wrap gap-3"
          }
        >
          <Motion initial="hidden" whileInView="visible" variants={Number1}>
            <EduDesignCard type="aplicatior" />
          </Motion>
          <Motion initial="hidden" whileInView="visible" variants={Number2}>
            <EduDesignCard type="master" />
          </Motion>
          <Motion initial="hidden" whileInView="visible" variants={Number3}>
            <EduDesignCard type="oneday" />
          </Motion>
        </div>
      </div>
    </section>
  );
}
