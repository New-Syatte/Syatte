import Image from "next/image";

interface DetailInfoProps {
  detailImage: string;
}

const DetailInfo = ({ detailImage }: DetailInfoProps) => {
  if (!detailImage)
    return (
      <article className="overflow-auto w-full h-screen bg-stone-300">
        <p className="text-center p-10">상세 정보가 없습니다.</p>
      </article>
    );
  return (
    <article className="overflow-auto w-full h-auto">
      <Image
        src={detailImage}
        alt="details"
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </article>
  );
};

export default DetailInfo;
