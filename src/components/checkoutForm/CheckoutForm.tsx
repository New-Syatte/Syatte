"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "@/redux/slice/cartSlice";
import styles from "./CheckjoutForm.module.scss";
import NextLink from "@/components/NextLink/NextLink";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";

export default function CheckoutForm() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <div className={styles.summary}>
      <h3>주문 요약</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>장바구니 상품이 없습니다.</p>
            <NextLink href={"/"}>홈으로</NextLink>
          </>
        ) : (
          <>
            <div>
              {cartItems.map(item => {
                const { id, name, price, cartQuantity, imageURL } = item;
                return (
                  // <div key={ id } className={ styles.card }>
                  <div
                    key={id}
                    className={
                      "flex justify-start items-center px-3 gap-3 text-[20px] border border-1px"
                    }
                  >
                    <Image src={imageURL} alt={name} width={100} height={100} />
                    <p>
                      <b>상품:</b> {name}
                    </p>
                    <p>
                      <b>개수:</b> {cartQuantity}
                    </p>
                    <p>
                      <b>가격:</b> {price}
                    </p>
                    <p>
                      <b>합계:</b> {priceFormat(price * cartQuantity)} 원
                    </p>
                  </div>
                );
              })}

              <div
                className={"flex justify-end text-[25px] mt-3 font-semibold"}
              >
                <p>
                  <b>총 상품 개수:</b> {cartTotalQuantity} 개
                </p>
              </div>
              <div className={" flex justify-end text-[25px] py-3"}>
                <p>
                  <b>합 계:</b> {priceFormat(cartTotalAmount)} 원
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
