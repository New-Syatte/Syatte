import Image from "next/image";
import Banner1 from "@/assets/product/Product-Banner1.png";
import Banner2 from "@/assets/product/Product-Banner2.png";

const ProductBanner = () => {
  const banners = [
    { img: Banner1, title: "메탈이펙트" },
    { img: Banner2, title: "컬러패스트" },
  ];
  return (
    <div className="flex gap-5 mt-24">
      {banners.map((banner, index) => (
        <div key={index}>
          <div className="w-[644px] h-[245px] relative bg-zinc-700 rounded-[10px]">
            <div className="left-[40px] top-[47px] absolute text-white text-[50px] font-bold">
              {banner.title}
            </div>
            <div className="left-[40px] top-[109px] absolute text-white text-[40px] font-normal">
              시리즈
            </div>
            <div className="w-[138px] h-[30px] left-[40px] top-[169px] absolute border border-white justify-center items-center gap-2.5 inline-flex">
              <span className="text-center text-white text-base font-bold whitespace-nowrap">
                시리즈 상품 보기
              </span>
            </div>
            <div className="w-[312px] h-[245px] left-[332px] top-0 absolute bg-gradient-to-r from-zinc-700 to-[rgba(0,0,0,0)] z-10" />
            <div className="absolute right-0 top-0 w-[312px] h-[245px]">
              <Image src={banner.img} alt="product-banner" fill />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductBanner;
