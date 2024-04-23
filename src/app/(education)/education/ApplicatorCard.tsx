import topbanner1 from "@/assets/education/topbanner-01.jpg";
import Image from "next/image";

const ApplicatorCard = () => {
  return (
    <div className={"w-56 flex flex-col justify-center items-center"}>
      <div className={"w-56 h-48 relative mb-6"}>
        <Image
          src={topbanner1}
          alt={"topbanner-01"}
          fill={true}
          className={"rounded-md"}
        />
      </div>
      <div>
        <span
          className={
            "text-black text-md font-normal font-['Helvetica'] uppercase leading-[27px]"
          }
        >
          샤뜨 페인팅 세미나를 진행합니다. 메탈릭페인트 워크샵 등..
        </span>
      </div>
    </div>
  );
};

export default ApplicatorCard;
