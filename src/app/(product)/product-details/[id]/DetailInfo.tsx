import Image from "next/image";

interface DetailInfoProps {
  detailImage: string;
}

const DetailInfo = ({ detailImage }: DetailInfoProps) => {
  return (
    <article className="overflow-auto w-[830px]">
      <Image src={detailImage} alt="details" width={830} height={1080} />
    </article>
  );
};

export default DetailInfo;
