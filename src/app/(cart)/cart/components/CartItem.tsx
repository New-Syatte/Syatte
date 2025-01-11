"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/type/cart";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import priceFormat from "@/utils/priceFormat";
import { memo, useCallback } from "react";
import { getDiscountPrice } from "@/utils/getDiscount";

interface CartItemProps {
  cart: CartItemType;
  isMobile: boolean;
  disabled?: boolean;
  onToggleCheck: (key: string) => void;
  onIncreaseQuantity: (cart: CartItemType) => void;
  onDecreaseQuantity: (cart: CartItemType) => void;
  onDeleteItem: (cart: CartItemType) => void;
}

const ICON_CLASS =
  "flex w-4 h-4 text-xs text-white bg-primaryBlue rounded-sm cursor-pointer mx-1 disabled:opacity-50 disabled:cursor-not-allowed";
const ICON_CLASS_MOBILE =
  "flex w-full h-full text-base text-white bg-primaryBlue rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

// 상품 이미지 컴포넌트
const ProductImage = memo(function ProductImage({
  imageURL,
  name,
  isMobile,
}: {
  imageURL: string;
  name: string;
  isMobile: boolean;
}) {
  const containerClass = isMobile ? "w-[77px] h-[77px]" : "w-[100px] h-[100px]";

  return (
    <div
      className={`flex justify-center items-center border border-lightGray ${containerClass}`}
    >
      <Image
        src={imageURL}
        alt={name}
        width={isMobile ? 77 : 100}
        height={isMobile ? 77 : 100}
        className="object-contain w-[80%] h-[80%]"
        loading="lazy"
        quality={75}
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6OTg2MDQ0PkE5OUFBPTw8PTo0Qj46QTw8Pjz/2wBDAR"
      />
    </div>
  );
});

// 수량 조절 버튼 컴포넌트
const QuantityControl = memo(function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  disabled,
  isMobile,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled: boolean;
  isMobile: boolean;
}) {
  const buttonClass = isMobile ? ICON_CLASS_MOBILE : ICON_CLASS;

  return (
    <div className="flex justify-between items-center gap-4">
      <button
        onClick={onDecrease}
        disabled={disabled}
        className={buttonClass}
        aria-label="수량 감소"
      >
        <HiMinus />
      </button>
      <p className="text-lg">{quantity}</p>
      <button
        onClick={onIncrease}
        disabled={disabled}
        className={buttonClass}
        aria-label="수량 증가"
      >
        <HiPlus />
      </button>
    </div>
  );
});

function CartItem({
  cart,
  isMobile,
  disabled = false,
  onToggleCheck,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteItem,
}: CartItemProps) {
  const {
    name,
    imageURL,
    price,
    discount,
    quantity,
    isChecked,
    color,
    colorCode,
    size,
    key,
  } = cart;
  const discountedPrice = getDiscountPrice(price, discount);

  const handleToggleCheck = useCallback(() => {
    if (!disabled) {
      onToggleCheck(key);
    }
  }, [disabled, key, onToggleCheck]);

  const handleIncreaseQuantity = useCallback(() => {
    if (!disabled) {
      onIncreaseQuantity(cart);
    }
  }, [disabled, cart, onIncreaseQuantity]);

  const handleDecreaseQuantity = useCallback(() => {
    if (!disabled) {
      onDecreaseQuantity(cart);
    }
  }, [disabled, cart, onDecreaseQuantity]);

  const handleDelete = useCallback(() => {
    if (!disabled) {
      onDeleteItem(cart);
    }
  }, [disabled, cart, onDeleteItem]);

  if (isMobile) {
    return (
      <div key={key} className="my-7">
        <div className="flex justify-start items-center gap-8">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleCheck}
            disabled={disabled}
            className="appearance-none w-4 h-4 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <ProductImage imageURL={imageURL} name={name} isMobile={true} />
          <div className="w-1/3 h-[77px]">
            <p className="text-sm text-nomal w-full">{name}</p>
            <div className="flex items-center gap-2">
              <p className="w-4 h-4" style={{ backgroundColor: colorCode }}></p>
              <p className="text-sm text-nomal w-full">{color}</p>
            </div>
            <p className="text-sm text-nomal w-full">{size}</p>
          </div>
        </div>
        <div className="flex h-5 justify-between items-center mt-5">
          <div className="flex w-[77px] justify-between items-center gap-4 ml-12">
            <QuantityControl
              quantity={quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              disabled={disabled}
              isMobile={true}
            />
          </div>
          <p className="text-lg font-bold text-right">
            {priceFormat(discountedPrice * quantity)} 원
          </p>
          <div>
            <button
              onClick={handleDelete}
              disabled={disabled}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="상품 삭제"
            >
              <RxCross2 className="w-5 h-5 text-lightGray" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-3 py-3" key={key}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleCheck}
        disabled={disabled}
        className="appearance-none w-5 h-5 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <ProductImage imageURL={imageURL} name={name} isMobile={false} />
      <div className="w-1/3">
        <p className="text-lg text-nomal w-full">{name}</p>
        <div className="flex gap-2 items-center">
          <p className="w-4 h-4" style={{ backgroundColor: colorCode }}></p>
          <p className="text-sm text-nomal w-full">{color}</p>
        </div>
        <p className="text-sm text-nomal w-full">{size}</p>
      </div>
      <QuantityControl
        quantity={quantity}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        disabled={disabled}
        isMobile={false}
      />
      <p className="text-[22px] font-bold w-1/5 text-right">
        {priceFormat(discountedPrice * quantity)} 원
      </p>
      <div>
        <button
          onClick={handleDelete}
          disabled={disabled}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="상품 삭제"
        >
          <RxCross2 className="w-5 h-5 text-lightGray" />
        </button>
      </div>
    </div>
  );
}

export default memo(CartItem);
