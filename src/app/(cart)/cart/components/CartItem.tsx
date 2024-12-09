"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/type/cart";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import priceFormat from "@/utils/priceFormat";

interface CartItemProps {
  cart: CartItemType;
  isMobile: boolean;
  onToggleCheck: (id: string) => void;
  onIncreaseQuantity: (cart: CartItemType) => void;
  onDecreaseQuantity: (cart: CartItemType) => void;
  onDeleteItem: (cart: CartItemType) => void;
}

const ICON_CLASS =
  "flex w-4 h-4 text-xs text-white bg-primaryBlue rounded-sm cursor-pointer mx-1 ";
const ICON_CLASS_MOBILE =
  "flex w-full h-full text-base text-white bg-primaryBlue rounded-sm cursor-pointer";

export default function CartItem({
  cart,
  isMobile,
  onToggleCheck,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteItem,
}: CartItemProps) {
  const { id, name, imageURL, price, discount, cartQuantity, isChecked } = cart;
  const discountedPrice = price - price * (discount / 100);

  if (isMobile) {
    return (
      <div key={id} className="my-7">
        <div className="flex justify-start items-center gap-8">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggleCheck(id)}
            className="appearance-none w-4 h-4 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue"
          />
          <div className="w-[77px] h-[77px] flex justify-center items-center border border-lightGray">
            <Image
              src={imageURL}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "80%", height: "auto" }}
            />
          </div>
          <div className="w-1/3 h-[77px]">
            <p className={"text-sm text-nomal w-full"}>{name}</p>
          </div>
        </div>
        <div className="flex h-5 justify-between items-center mt-5">
          <div
            className={"flex w-[77px] justify-between items-center gap-4 ml-12"}
          >
            <HiMinus
              className={ICON_CLASS_MOBILE}
              onClick={() => onDecreaseQuantity(cart)}
            />
            <p className={"text-lg"}>{cartQuantity}</p>
            <HiPlus
              className={ICON_CLASS_MOBILE}
              onClick={() => onIncreaseQuantity(cart)}
            />
          </div>
          <p className={"text-lg font-bold text-right"}>
            {priceFormat(discountedPrice * cartQuantity)} 원
          </p>
          <div>
            <button onClick={() => onDeleteItem(cart)}>
              <RxCross2 className="w-5 h-5 text-lightGray" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={"flex justify-between items-center px-3 py-3"} key={id}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggleCheck(id)}
        className="appearance-none w-5 h-5 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue"
      />
      <div className="w-[100px] h-[100px] flex justify-center items-center border border-lightGray">
        <Image
          src={imageURL}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "80%", height: "auto" }}
        />
      </div>
      <div className="w-1/3">
        <p className={"text-lg text-nomal w-full"}>{name}</p>
      </div>
      <div className={"flex justify-between items-center gap-4"}>
        <HiMinus
          className={ICON_CLASS}
          onClick={() => onDecreaseQuantity(cart)}
        />
        <p className={"text-lg"}>{cartQuantity}</p>
        <HiPlus
          className={ICON_CLASS}
          onClick={() => onIncreaseQuantity(cart)}
        />
      </div>
      <p className={"text-[22px] font-bold w-1/5 text-right"}>
        {priceFormat(discountedPrice * cartQuantity)} 원
      </p>
      <div>
        <button onClick={() => onDeleteItem(cart)}>
          <RxCross2 className="w-5 h-5 text-lightGray" />
        </button>
      </div>
    </div>
  );
}
