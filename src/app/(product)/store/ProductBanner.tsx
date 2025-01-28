import Image from "next/image";
import Banner1 from "@/assets/product/Product-Banner1.png";
import Banner2 from "@/assets/product/Product-Banner2.png";
import URLS from "@/constants/urls";
import Link from "next/link";

const ProductBanner = () => {
  const banners = [
    {
      img: Banner1,
      title: "메탈이펙트",
      query: "/modernMasters/metalEffect",
    },
    {
      img: Banner2,
      title: "컬러패스트",
      query: "/modernMasters/colorFast",
    },
  ];
  return (
    <div className="flex sm:w-full sm:flex-col gap-5 mt-24">
      {banners.map((banner, index) => (
        <Link key={index} href={`${URLS.PRODUCT_STORE_BRAND}/${banner.query}`}>
          <div
            className={
              "sm:w-[80%] w-[644px] sm:h-[121px] h-[245px] relative rounded-[10px]" +
              (banner.query === "colorFast" ? " bg-[#8b6b5c]" : " bg-zinc-700")
            }
          >
            <div className="left-[5%] top-[7%] absolute text-white sm:text-2xl text-[50px] font-bold">
              {banner.title}
            </div>
            <div className="left-[5%] top-[33%] absolute text-white sm:text-xl text-[40px] font-normal">
              시리즈
            </div>
            <div className="px-3 sm:py-0 py-1 left-[5%] top-[72%] absolute border border-white justify-center items-center inline-flex">
              <span className="sm:text-[8px] text-center text-white text-base font-bold whitespace-nowrap">
                시리즈 상품 보기
              </span>
            </div>
            <div
              className={
                "sm:h-[121px] w-1/2 h-[245px] left-1/2 top-0 absolute bg-gradient-to-r to-[rgba(0,0,0,0)] z-10" +
                (banner.query === "colorFast"
                  ? " from-[#8b6b5c]"
                  : " from-zinc-700")
              }
            />
            <div className="absolute right-0 top-0 sm:w-[49%] w-1/2 sm:h-[121px] h-[245px]">
              <Image
                src={banner.img}
                alt="product-banner"
                fill
                sizes="(max-width: 768px) 49vw, 50vw"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductBanner;
