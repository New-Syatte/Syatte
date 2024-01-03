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
import useNextRouter from "@/hooks/useNextRouter";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import Slider from "@/components/slider/Slider";

type ProductContent = Pick<
  ProductForDetail,
  | "_id"
  | "productName"
  | "price"
  | "description"
  | "feature"
  | "images"
  | "youtubeUrls"
>;

const ProductContent = ({
  _id,
  productName,
  price,
  description,
  feature,
  images,
  youtubeUrls,
}: ProductContent) => {
  const dispatch = useDispatch();
  const router = useNextRouter();
  const [count, setCount] = useState(1);

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
      <div className="flex justify-center items-center">
        {/* Carousel 자리 */}
        <div className="w-[650px]">
          <Slider datas={images} width={650} height={650} />
        </div>
        <div className="w-[542px]">
          <h2 className="text-[40px] font-bold mb-[60px]">{productName}</h2>
          <p className="text-xl mb-10">{description}</p>
          <ul className="border-whitegray border-y-2 py-10 list-disc">
            {feature &&
              feature.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
          </ul>
          <div className="flex justify-start items-center h-[98px] border-b-2 gap-8">
            <p className="text-xl font-bold w-14">수량</p>
            <div className="w-[118px] h-9">
              <div className="flex justify-between items-center h-9">
                <Button
                  onClick={() => setCount(prev => prev - 1)}
                  disabled={count > 1 ? false : true}
                  secondary
                  style="w-10 h-9 border-lightGray border p-0"
                >
                  -
                </Button>
                <p className="w-10 h-9 text-center align-middle border-y border-lightGray">
                  <b className="text-lg">{count}</b>
                </p>
                <Button
                  secondary
                  onClick={() => setCount(prev => prev + 1)}
                  style="w-10 h-9 border-lightGray border p-0"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center h-[89px] border-b-2 border-black gap-8">
            <p className="text-xl font-bold w-14">배송비</p>
            <p className="text-xl font-medium">0 원</p>
          </div>
          <div className="flex font-bold py-10 justify-between items-center">
            <h3 className="text-[28px]">상품금액</h3>
            <p className="text-4xl">{price.toLocaleString()} 원</p>
          </div>
          <div className="flex justify-center items-center gap-[18px]">
            <Button
              onClick={() => {
                addToCart();
                router.push("/cart");
              }}
              style="flex w-full h-20 justify-center items-center bg-colorBlack text-colorWhite"
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="my-[200px] w-full h-[720px] bg-black flex justify-center items-center">
        {youtubeUrls && (
          <VideoPlayer videoUrls={youtubeUrls} width={1280} height={720} />
        )}
      </div>
    </div>
  );
};

export default ProductContent;
