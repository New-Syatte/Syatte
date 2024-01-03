"use client";

import useNextRouter from "@/hooks/useNextRouter";
import styles from "./CartClient.module.scss"; // 스타일 설정
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "@/redux/slice/cartSlice";
import { useEffect } from "react";
import Heading from "@/components/heading/Heading";
import NextLink from "@/components/NextLink/NextLink";
import priceFormat from "@/utils/priceFormat";
import Button from "@/components/button/Button";
import { ICartItem } from "@/type";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import deliveryFee from "@/constants/deliveryFee";

const ICON_CLASS =
  "flex text-[24px] transition-all cursor-pointer hover:text-brand hover:scale-200 mx-1 ";

export default function CartClient() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();
  const router = useNextRouter();

  const increaseCart = (cart: ICartItem) => {
    // 일단 타입을 any 로 임시 지정
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart: ICartItem) => {
    // 일단 타입을 any 로 임시 지정
    dispatch(DECREASE_CART(cart));
  };

  const removeCart = (cart: ICartItem) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const checkout = () => {
    router.push("/checkout-address");
  };
  // url, checkout은 사용되지 않고 잇다

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  return (
    <section className={styles.table}>
      <Heading title={"장바구니"} />
      {cartItems.length === 0 ? (
        <>
          <p className={"text-center font-bold text-[30px]"}>
            장바구니가 비었습니다.
          </p>
          <div
            className={"text-center font-bold text-[30px] border-[2px] mt-4"}
          >
            <NextLink href={"/products/all"}>계속 쇼핑하기</NextLink>
          </div>
        </>
      ) : (
        <>
          <div className={"border-[1px] mt-4"} />
          {cartItems.map(cart => {
            const { id, name, imageURL, price, cartQuantity } = cart;
            return (
              <>
                <div
                  className={"flex justify-between items-center px-3"}
                  key={id}
                >
                  <div>
                    <Image src={imageURL} alt={name} width={200} height={200} />
                  </div>
                  <div>
                    <p className={"text-[20px] text-nomal"}>{name}</p>
                  </div>
                  <div className={"flex justify-between items-center gap-4"}>
                    <AiFillCaretDown
                      className={ICON_CLASS}
                      onClick={() => decreaseCart(cart)}
                    />
                    <p className={"text-[20px]"}>{cartQuantity} 개</p>
                    <AiFillCaretUp
                      className={ICON_CLASS}
                      onClick={() => increaseCart(cart)}
                    />
                  </div>
                  <div>
                    <span className={"text-[20px] text-darkgray"}>
                      {deliveryFee === 0 ? "무료배송" : deliveryFee}
                    </span>
                  </div>

                  <p className={"text-[24px]"}>
                    {priceFormat(price * cartQuantity)} 원
                  </p>
                  <div>
                    <Button
                      type="button"
                      style="py-3 px-12"
                      onClick={() => removeCart(cart)}
                    >
                      삭 제
                    </Button>
                  </div>
                </div>
                <div className={"border-[1px] mt-4"} />
              </>
            );
          })}
        </>
      )}
      <div className={styles.summary}>
        <Button type="button" style="py-3 px-12" onClick={clearCart}>
          카트 비우기
        </Button>

        <div className={styles.checkout}>
          <div className={"flex justify-between items-center"}>
            <p className={"text-[20px]"}>전체 상품 개수</p>
            <p className={"text-[24px]"}>{cartTotalQuantity} 개</p>
          </div>
          <div className={"flex gap-4"}>
            <h4 className={"font-semibold mb-4 text-xl"}>합계</h4>
            <p className={"font-semibold text-2xl"}>
              {priceFormat(cartTotalAmount)}원
            </p>
          </div>
          <Button onClick={checkout} style="w-full h-10">
            주 소 입 력
          </Button>
        </div>
      </div>
    </section>
  );
}
