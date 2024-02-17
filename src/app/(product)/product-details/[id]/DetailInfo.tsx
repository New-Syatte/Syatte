import Image from "next/image";

interface DetailInfoProps {
  detailImage: string;
}

const DetailInfo = ({ detailImage }: DetailInfoProps) => {
  if (!detailImage)
    return (
      <article className="overflow-auto w-[830px] h-screen bg-stone-300">
        <p className="text-center p-10">상세 정보가 없습니다.</p>
      </article>
    );
  return (
    <article className="overflow-auto w-[830px]">
      <Image src={detailImage} alt="details" width={830} height={1080} />
    </article>
  );
};

export default DetailInfo;
