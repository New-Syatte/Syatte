"use client";
import Link from "next/link";
import Image from "next/image";
import { Mobile } from "@/hooks/useMediaQuery";

interface EachProductProps {
  product: any;
  width?: number;
  height?: number;
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
  console.log(product);
  const { productName: title, options, mainImage } = product;
  const price = options[0].sizes[0].price;
  const discount = options[0].sizes[0].discount;

  const discountedPrice = price - price * (discount / 100);

  const isMobile = Mobile();

  return (
    <Link
      href={linkTo}
      className="flex justify-center items-center flex-col w-full"
    >
      <div
        style={{
          width: `${isMobile ? "150px" : width + "px"}`,
          height: `${isMobile ? "150px" : height + "px"}`,
        }}
        className={`bg-${bgColor} border border-zinc-300 flex items-center justify-center`}
      >
        <div
          className="relative"
          style={{
            width: `${isMobile ? "115px" : imgWidth + "px"}`,
            height: `${isMobile ? "115px" : imgHeight + "px"}`,
          }}
        >
          <Image
            src={mainImage.imageUrl}
            alt="image"
            fill
            sizes="(max-width: 768px) 115px, 212px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        className={`text-${titleSize} sm:text-sm text-black font-normal mt-7 hover:underline`}
      >
        {title}
      </div>
      <div className="hover:underline sm:mt-1 mt-[10px] flex gap-2 items-end">
        <span className="text-rose-500 sm:text-xs text-2xl font-bold leading-[30px]">
          {discount + "%"}
        </span>
        <span className="text-zinc-400 sm:text-[10px] text-lg font-normal line-through leading-[30px] sm:leading-normal">
          {price.toLocaleString()}원
        </span>
        <span className="text-black sm:text-sm text-2xl font-bold">
          {discountedPrice.toLocaleString()}원
        </span>
      </div>
    </Link>
  );
}
