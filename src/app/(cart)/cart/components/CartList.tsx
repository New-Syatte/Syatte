"use client";

import { CartItem as CartItemType } from "@/type/cart";
import dynamic from "next/dynamic";
import Image from "next/image";
import CartIcon from "@/assets/cart/cartIcon.svg";
import { memo } from "react";

// 동적 임포트로 CartItem 컴포넌트 로드
const CartItem = dynamic(() => import("./CartItem").then(mod => mod.default), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-[100px] w-full rounded" />
  ),
  ssr: false,
});

interface CartListProps {
  cartItems: CartItemType[];
  isMobile: boolean;
  disabled?: boolean;
  onToggleCheck: (id: string) => void;
  onIncreaseQuantity: (cart: CartItemType) => void;
  onDecreaseQuantity: (cart: CartItemType) => void;
  onDeleteItem: (cart: CartItemType) => void;
}

// 빈 장바구니 컴포넌트
const EmptyCart = memo(function EmptyCart() {
  return (
    <div className="w-full h-96 flex flex-col justify-center items-center gap-10">
      <div className="w-1/3 flex justify-center items-center">
        <Image
          src={CartIcon}
          alt="cart icon"
          width={100}
          height={100}
          className="w-1/2 h-auto"
          priority={false}
          loading="lazy"
          quality={75}
        />
      </div>
      <p className="text-3xl text-[#dddddd] font-bold">
        장바구니가 비어 있습니다
      </p>
    </div>
  );
});

function CartList({
  cartItems,
  isMobile,
  disabled = false,
  onToggleCheck,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteItem,
}: CartListProps) {
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-4">
      {cartItems.map(cart => (
        <CartItem
          key={cart.id}
          cart={cart}
          isMobile={isMobile}
          disabled={disabled}
          onToggleCheck={onToggleCheck}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
}

export default memo(CartList);
