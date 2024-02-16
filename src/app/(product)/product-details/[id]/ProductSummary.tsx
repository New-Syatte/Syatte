"use client";

import { ProductForDetail } from "@/model/products";
import Button from "@/components/button/Button";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
} from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/slider/Slider";
import Image from "next/image";

interface ProductSummaryProps {
  _id: string;
  productName: string;
  price: number;
  description: string;
  feature: string[];
  images: { imageUrl: string }[];
  discount: number;
}

const ProductSummary = ({
  _id,
  productName,
  price,
  description,
  feature,
  images,
  discount,
}: ProductSummaryProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0].imageUrl);

  const setIndexImage = (index: number) => {
    setSelectedImage(images[index].imageUrl);
  };

  const addToCart = () => {
    const product = {
      id: _id,
      name: productName,
      price,
      imageURL: images[0].imageUrl,
    };
    dispatch(ADD_TO_CART({ ...product, quantity: count }));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-[415px]">
        {/* Image */}
        <div className="flex justify-center items-center w-[415px] h-[302px] bg-zinc-100 rounded border border-zinc-400">
          <Image
            src={selectedImage}
            alt={productName}
            width={190}
            height={190}
          />
        </div>
        {/* Carousel 자리 */}
        <div className="w-[415px] mb-12 mt-5">
          <Slider
            datas={images}
            width={89}
            height={54}
            slidePerView={4}
            arrowSize={30}
            setIndexImage={setIndexImage}
          />
        </div>
        <div className="w-full">
          <h2 className="text-neutral-800 text-3xl font-bold mb-5">
            {productName}
          </h2>
          <p className="text-neutral-800 text-sm font-normal leading-[25.20px]">
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
          <div className="flex justify-start items-center border-b-2 gap-8 w-[415px] h-[61px] bg-zinc-100 rounded mt-7 p-3">
            <div className="w-[103px] h-9">
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
          </div>
          {/* 주문 금액 */}
          <div>
            <div className="flex justify-between items-center gap-8 w-[415px] h-[61px] mt-7 p-3">
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
                router.push("/cart");
              }}
              styleType="blank"
              style="w-[200px] h-[62px] py-[17.80px] bg-white rounded-[50px] border-2 border-gray-400 justify-center items-center inline-flex text-gray-400 text-lg font-bold"
            >
              장바구니
            </Button>
            <Button
              onClick={() => {
                addToCart();
                router.push("/cart");
              }}
              styleType="blank"
              style="w-[200px] h-[62px] py-[17.80px] bg-gray-400 rounded-[50px] justify-center items-center inline-flex text-white text-lg font-bold"
            >
              바로구매
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
