import Link from "next/link";
import Image from "next/image";

interface EachProductProps {
  product: any;
  width: number;
  height: number;
  imgWidth?: number;
  imgHeight?: number;
  bgColor?: string;
  linkTo: string;
  titleSize?: string;
  [key: string]: any;
}

export default function Card({
  product,
  width = 312,
  height = 312,
  imgWidth = 212,
  imgHeight = 212,
  bgColor = "white", // bg-white
  linkTo,
  titleSize = "xl",
}: EachProductProps) {
  const { productName: title, discount, price, mainImage } = product;

  const discountedPrice = price - price * (discount / 100);

  return (
    <Link href={linkTo}>
      <div
        style={{ width: width, height: height }}
        className={`bg-${bgColor} border border-zinc-300 flex items-center justify-center`}
      >
        <div
          className="relative"
          style={{ width: imgWidth, height: imgHeight }}
        >
          <Image
            src={mainImage.imageUrl}
            alt="image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        className={`text-${titleSize} text-black text-lg font-normal mt-7 hover:underline`}
      >
        {title}
      </div>
      <div className="hover:underline mt-[10px] flex gap-2 items-end">
        <span className="text-rose-500 text-2xl font-bold leading-[30px]">
          {discount + "%"}
        </span>
        <span className="text-zinc-400 text-lg font-normal line-through leading-[30px]">
          {price.toLocaleString()}원
        </span>
        <span className="text-black text-2xl font-bold">
          {discountedPrice.toLocaleString()}원
        </span>
      </div>
      {/* 나중에 장바구니 이벤트처리로 따로 빼기 */}
      <article className="flex gap-2 mt-[10px]">
        <Image src="/download.svg" alt="toCart" width={15} height={15} />
        <p className="text-center text-neutral-400 text-base font-normal">
          카트 담기
        </p>
      </article>
    </Link>
  );
}
