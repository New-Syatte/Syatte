import NextLink from "@/components/NextLink/NextLink";
import Image from "next/image";

interface EachProductProps {
  title: string;
  width: number;
  height: number;
  src: string;
  linkTo: string;
  price?: number;
  titleSize?: string;
  [key: string]: any;
}

export default function Card({
  title,
  width,
  height,
  src,
  linkTo,
  price,
  titleSize = "xl",
  ...restProps
}: EachProductProps) {
  return (
    <NextLink href={linkTo} className={`w-${width} block`}>
      <div className="bg-bgGray">
        <Image src={src} alt="image" width={width} height={width} />
      </div>
      <div className={`text-${titleSize} font-medium mt-7 hover:underline`}>
        {title}
      </div>
      {/* 다른 조건문 필요 */}
      {price && (
        <div className="mt-[6px] hover:underline">
          {price.toLocaleString()}원
        </div>
      )}
    </NextLink>
  );
}
