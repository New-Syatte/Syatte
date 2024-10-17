"use client";

import { ProductForDetail } from "@/type/products";
import Button from "@/components/button/Button";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/slider/Slider";
import URLS from "@/constants/urls";
import SliderPreview from "@/components/slider/SliderPreview";

type ProductSummaryProps = Omit<
  ProductForDetail,
  "category" | "detailCategory" | "detailImage"
>;

const ProductSummary = ({
  _id,
  productName,
  price,
  description,
  images,
  discount,
}: ProductSummaryProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [count, setCount] = useState(1);

  const addToCart = () => {
    const product = {
      id: _id,
      name: productName,
      price,
      discount,
      imageURL: images[0].imageUrl,
    };
    dispatch(ADD_TO_CART({ ...product, quantity: count }));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:w-[90%] w-[415px]">
        {/* Image */}
        <div className="flex justify-center items-center sm:w-[90%] w-[415px] h-[302px] bg-zinc-100 rounded border border-zinc-400">
          <Slider
            id="productDetailSlider"
            datas={images}
            width={190}
            height={190}
            slidePerView={1}
            arrowSize={30}
          />
        </div>
        {/* Carousel 자리 */}
        <div className="sm:w-full flex justify-center items-center gap-2 w-[415px] mb-12 mt-5 overflow-x-auto">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-center w-1/5">
              <SliderPreview
                id="productDetailSlider"
                imgUrl={image.imageUrl as any}
                index={index}
              />
            </div>
          ))}
        </div>
        <div className="w-full">
          <h2 className="text-neutral-800 text-3xl font-bold mb-5">
            {productName}
          </h2>
          <p className="text-neutral-800 text-sm font-normal sm:leading-normal leading-[25.20px]">
            {description}
          </p>
          {/* <ul className="border-whitegray border-y-2 py-10 list-disc">
            {feature &&
              feature.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
          </ul> */}
          {/* 가격 */}
          <article className="flex flex-col font-bold py-10 justify-between items-start gap-2">
            <div className="flex gap-2 justify-start items-end">
              <p className="text-rose-500 text-2xl font-bold leading-[30px]">
                {discount}%
              </p>
              <p className="text-zinc-400 text-lg font-normal line-through leading-[30px]">
                {price.toLocaleString()} 원
              </p>
            </div>
            <p className="text-black text-[38px] font-bold leading-[30px]">
              {(price - (price * discount) / 100).toLocaleString()}원
            </p>
          </article>
          {/* 수량 버튼 */}
          <div className="flex justify-between items-center border-b-2 gap-8 sm:w-full w-[415px] h-[61px] bg-zinc-100 rounded mt-7 p-3">
            <div className="sm:w-1/2 w-[103px] h-9">
              <div className="flex justify-between items-center h-9 bg-white border border-zinc-300 rounded">
                <Button
                  onClick={() => setCount(prev => prev - 1)}
                  disabled={count > 1 ? false : true}
                  styleType="blank"
                  style="w-10 h-9 p-0"
                >
                  -
                </Button>
                <p className="w-10 h-9 flex justify-center items-center">
                  <b className="text-black text-lg">{count}</b>
                </p>
                <Button
                  onClick={() => setCount(prev => prev + 1)}
                  styleType="blank"
                  style="w-10 h-9 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <p className="text-neutral-800 sm:text-base text-[22px] font-bold">
                {(price - (price * discount) / 100).toLocaleString()}원
              </p>
            </div>
          </div>
          {/* 주문 금액 */}
          <div>
            <div className="flex justify-between items-center gap-8 sm:w-full w-[415px] h-[61px] mt-7 p-3">
              <p className="text-neutral-800 text-[22px] font-bold">주문금액</p>
              <p className="text-neutral-800 text-[28px] font-bold ">
                {(price - (price * discount) / 100).toLocaleString()}원
              </p>
            </div>
          </div>
          {/* 구매하기 버튼 */}
          <div className="flex justify-center items-center gap-[18px] mt-8">
            <Button
              onClick={() => {
                addToCart();
              }}
              styleType="blank"
              style="w-[200px] h-[62px] py-[17.80px] bg-white rounded-[50px] border-2 border-primaryBlue justify-center items-center inline-flex text-primaryBlue text-lg font-bold hover:bg-primaryBlue hover:text-white"
            >
              장바구니
            </Button>
            <Button
              onClick={() => {
                addToCart();
                router.push(URLS.CART);
              }}
              styleType="blank"
              style="w-[200px] h-[62px] py-[17.80px] bg-primaryBlue rounded-[50px] justify-center items-center inline-flex text-white text-lg font-bold hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2"
            >
              바로구매
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSummary;
