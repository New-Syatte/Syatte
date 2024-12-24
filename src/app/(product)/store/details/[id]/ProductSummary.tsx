"use client";

import { Product } from "@/type/products";
import Button from "@/components/button/Button";
import { ADD_TO_CART } from "@/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/slider/Slider";
import URLS from "@/constants/urls";
import SliderPreview from "@/components/slider/SliderPreview";
import { toast } from "react-toastify";
import ProductSelects from "./ProductSelects";
import { selectColor, selectSize } from "@/redux/slice/productOptionsSlice";
import TempItem from "./TempItem";
import {
  addTempItem,
  updateTempItemQuantity,
  removeTempItem,
  selectTempItems,
} from "@/redux/slice/productTempSlice";

export default function ProductSummary({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const selectedColor = useSelector(selectColor);
  const selectedSize = useSelector(selectSize);
  const tempItems = useSelector(selectTempItems);

  const { _id, productName, options, description, images } = product;

  const handleAddOption = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("옵션을 선택해주세요.");
      return;
    }

    const colorOption = options.find(
      opt => opt.color.colorName === selectedColor.colorName,
    );
    const sizeOption = colorOption?.sizes.find(
      size => size.size === selectedSize,
    );

    if (!sizeOption) return;

    const newItem = {
      color: selectedColor.colorName,
      colorCode: selectedColor.colorCode,
      size: selectedSize,
      price: sizeOption.price,
      discount: sizeOption.discount,
      quantity: 1,
    };

    dispatch(addTempItem(newItem));
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    dispatch(updateTempItemQuantity({ index, quantity }));
  };

  const handleDeleteItem = (index: number) => {
    dispatch(removeTempItem(index));
  };

  const getTotalPrice = () => {
    return tempItems.reduce((total, item) => {
      const discountedPrice = item.price - (item.price * item.discount) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

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
            price: item.price - (item.price * item.discount) / 100,
            imageURL: images[0].imageUrl,
            discount: item.discount,
            quantity: item.quantity,
            color: item.color,
            colorCode: item.colorCode,
            size: item.size,
            key: _id + item.color + item.size,
          }),
        );
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
            <Button
              onClick={handleAddOption}
              styleType="blank"
              style="w-full h-12 mt-4 border border-gray-300 rounded"
            >
              옵션 추가
            </Button>
          </div>

          {/* Selected Items */}
          <div className="mt-8 space-y-4">
            {tempItems.map((item, index) => (
              <TempItem
                key={`${item.color}-${item.size}-${index}`}
                item={item}
                onQuantityChange={quantity =>
                  handleQuantityChange(index, quantity)
                }
                onDelete={() => handleDeleteItem(index)}
              />
            ))}
          </div>

          {/* Total Price */}
          {tempItems.length > 0 && (
            <div className="flex justify-between items-center mt-8 py-4 border-t-2">
              <span className="text-xl font-bold">총 상품금액</span>
              <span className="text-2xl font-bold">
                {getTotalPrice().toLocaleString()}원
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center items-center gap-[18px] mt-8">
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
