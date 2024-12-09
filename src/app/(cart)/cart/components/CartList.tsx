"use client";

import { CartItem as CartItemType } from "@/type/cart";
import CartItem from "./CartItem";
import Image from "next/image";
import CartIcon from "@/assets/cart/cartIcon.svg";

interface CartListProps {
  cartItems: CartItemType[];
  isMobile: boolean;
  onToggleCheck: (id: string) => void;
  onIncreaseQuantity: (cart: CartItemType) => void;
  onDecreaseQuantity: (cart: CartItemType) => void;
  onDeleteItem: (cart: CartItemType) => void;
}

export default function CartList({
  cartItems,
  isMobile,
  onToggleCheck,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteItem,
}: CartListProps) {
  if (cartItems.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col justify-center items-center gap-10">
        <div className="w-1/3 flex justify-center items-center">
          <Image
            src={CartIcon}
            alt="cart icon"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "50%", height: "auto" }}
          />
        </div>
        <p className="text-3xl text-[#dddddd] font-bold">
          장바구니가 비어 있습니다
        </p>
      </div>
    );
  }

  return (
    <>
      {cartItems.map(cart => (
        <CartItem
          key={cart.id}
          cart={cart}
          isMobile={isMobile}
          onToggleCheck={onToggleCheck}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </>
  );
}
