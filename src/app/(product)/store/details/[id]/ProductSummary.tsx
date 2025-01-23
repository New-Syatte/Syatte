"use client";

import { Product } from "@/type/products";
import Button from "@/components/button/Button";
import { ADD_TO_CART } from "@/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/slider/Slider";
import URLS from "@/constants/urls";
import SliderPreview from "@/components/slider/SliderPreview";
import { toast } from "react-toastify";
import ProductSelects from "./ProductSelects";
import TempItem from "./TempItem";
import {
  updateTempItemQuantity,
  removeTempItem,
  selectTempItems,
  resetTempItems,
} from "@/redux/slice/productTempSlice";
import { getDiscountPrice } from "@/utils/getDiscount";

export default function ProductSummary({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const tempItems = useSelector(selectTempItems);
  const [isFixed, setIsFixed] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 뷰포트 상단을 벗어났는지 확인
        const boundingRect = entry.boundingClientRect;

        // 요소가 뷰포트 상단을 벗어났을 때만 fixed 적용
        if (boundingRect.top < 0) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px", // 뷰포트의 경계를 기준으로 함
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [tempItems]);

  const { _id, productName, options, description, images } = product;

  const handleQuantityChange = (index: number, quantity: number) => {
    dispatch(updateTempItemQuantity({ index, quantity }));
  };

  const handleDeleteItem = (index: number) => {
    dispatch(removeTempItem(index));
  };

  const getTotalPrice = () => {
    const { totalOriginalPrice, totalDiscountedPrice } = tempItems.reduce(
      (acc, item) => {
        const originalPrice = item.price * item.quantity;
        const discountedPrice =
          getDiscountPrice(item.price, item.discount) * item.quantity;

        acc.totalOriginalPrice += originalPrice;
        acc.totalDiscountedPrice += discountedPrice;
        return acc;
      },
      { totalOriginalPrice: 0, totalDiscountedPrice: 0 },
    );

    // 전체 할인율 계산 (소수점 제거)
    const totalDiscountPercentage = Math.floor(
      ((totalOriginalPrice - totalDiscountedPrice) / totalOriginalPrice) * 100,
    );

    return {
      totalOriginalPrice,
      totalDiscountedPrice,
      totalDiscountPercentage,
    };
  };
  const { totalOriginalPrice, totalDiscountedPrice, totalDiscountPercentage } =
    getTotalPrice();

  const handleAddToCart = (redirectToCart: boolean = false) => {
    if (tempItems.length === 0) {
      toast.error("상품을 선택해주세요.");
      return;
    }

    try {
      tempItems.forEach(item => {
        dispatch(
          ADD_TO_CART({
            id: _id,
            name: productName,
            price: item.price,
            imageURL: images[0].imageUrl,
            discount: item.discount,
            quantity: item.quantity,
            color: item.color,
            colorCode: item.colorCode,
            size: item.size,
            key: _id + item.color + item.size,
          }),
        );
        dispatch(resetTempItems());
      });

      toast.success("장바구니에 추가되었습니다.");

      if (redirectToCart) {
        startTransition(() => {
          router.push(URLS.CART);
        });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("장바구니에 추가하는 중 오류가 발생했습니다.");
    }
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
        {/* Carousel */}
        <div className="sm:w-full flex justify-center items-center gap-2 w-[415px] mb-12 mt-5 overflow-x-auto">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-center w-1/5">
              <SliderPreview
                id="productDetailSlider"
                imgUrl={image.imageUrl}
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

          {/* Option Select */}
          <div className="mt-8">
            <ProductSelects options={options} />
          </div>

          {/* Observer Target */}
          <div ref={observerRef} className="w-full h-1" />

          {/* Selected Items */}
          <div
            className={`mt-8 space-y-4 overflow-y-auto h-52 md:scrollbar-thin lg:scrollbar-thin ${
              isFixed &&
              tempItems.length > 0 &&
              "sm:fixed sm:bottom-[140px] sm:left-0 sm:w-full sm:h-32 sm:px-7 sm:py-2 sm:bg-white sm:border-t sm:border-gray-200 sm:overflow-y-hidden"
            } ${tempItems.length > 0 ? "h-52" : "h-auto"}`}
          >
            {tempItems.map((item, index) => (
              <TempItem
                key={`${item.color}-${item.size}-${index}`}
                item={item}
                onQuantityChange={quantity =>
                  handleQuantityChange(index, quantity)
                }
                onDelete={() => handleDeleteItem(index)}
                productName={product && productName}
              />
            ))}
          </div>

          {/* Total Price */}
          {tempItems.length > 0 && (
            <div
              className={`flex justify-between items-center mt-8 py-4 border-t-2 ${
                isFixed &&
                "sm:fixed sm:bottom-20 sm:left-0 sm:w-full sm:h-[60px] sm:px-7 sm:py-4 sm:bg-white sm:border-t sm:border-gray-200 sm:overflow-y-hidden"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-secondaryRed">
                  {totalDiscountPercentage}%
                </span>
                <span className="text-lg font-bold text-darkGray line-through">
                  {totalOriginalPrice.toLocaleString()}원
                </span>
              </div>
              <span className="text-2xl font-bold">
                {totalDiscountedPrice.toLocaleString()}원
              </span>
            </div>
          )}

          {/* Buttons */}
          <div
            id="cart-buttons"
            className={`flex justify-center items-center gap-[18px] mt-8 ${
              isFixed
                ? "sm:fixed sm:bottom-0 sm:left-0 sm:w-full sm:bg-white sm:p-4 sm:border-t sm:border-gray-200 sm:h-20"
                : ""
            }`}
          >
            <Button
              onClick={() => handleAddToCart(false)}
              styleType="blank"
              style="w-[200px] h-[62px] py-[17.80px] bg-white rounded-[50px] border-2 border-primaryBlue justify-center items-center inline-flex text-primaryBlue text-lg font-bold hover:bg-primaryBlue hover:text-white"
              disabled={isPending}
            >
              {isPending ? "처리중..." : "장바구니"}
            </Button>
            <Button
              onClick={() => handleAddToCart(true)}
              styleType="blank"
              style="w-[200px] h-[62px] py-[17.80px] bg-primaryBlue rounded-[50px] justify-center items-center inline-flex text-white text-lg font-bold hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2"
              disabled={isPending}
            >
              {isPending ? "처리중..." : "바로구매"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
