"use client";

import Heading from "@/components/heading/Heading";
import priceFormat from "@/utils/priceFormat";
import Button from "@/components/button/Button";
import Link from "next/link";
import URLS from "@/constants/urls";
import Image from "next/image";
import SuccessCheck from "@/assets/cart/successCheck.svg";
import { useDispatch } from "react-redux";
import { REMOVE_CHECKED_ITEMS_FROM_CART } from "@/redux/slice/cartSlice";
import { useEffect, useTransition } from "react";
import { PaymentResponse } from "@/type/tossPayments";
import { Order } from "@/type/order";
import { formatTime } from "@/utils/formatTime";
import { deleteCheckoutData } from "@/app/actions";
import { toast } from "react-toastify";

interface CheckoutSuccessClientProps {
  payment: PaymentResponse;
  order: Order;
}

export default function CheckoutSuccessClient({
  payment,
  order,
}: CheckoutSuccessClientProps) {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        // 체크아웃 데이터 삭제
        await deleteCheckoutData();
        // 장바구니에서 결제 완료된 상품들 제거
        dispatch(REMOVE_CHECKED_ITEMS_FROM_CART());
      } catch (error) {
        console.error("Failed to cleanup checkout data:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "체크아웃 데이터 정리 중 오류가 발생했습니다.",
        );
      }
    });
  }, [dispatch]);

  const listStyle = "flex justify-between text-lg mb-4";
  const subTitle = "text-[22px] font-bold";

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 pt-24">
      <Image
        src={SuccessCheck}
        alt="successIcon"
        width={80}
        height={80}
        className="my-10"
      />
      <Heading title={"결제 완료"} center fontSize="6xl sm:text-3xl" />
      <ul className="p-8 border border-lightGray w-2/5 rounded-md mt-12 sm:w-[90%]">
        <li className={listStyle}>
          <b className={subTitle}>결제 상품</b>
          {payment.orderName}
        </li>
        <li className={listStyle}>
          <b className={subTitle}>주문 번호</b>
          {order._id}
        </li>
        <li className={listStyle + " pb-2"}>
          <b className={subTitle}>결제 수단</b>
          {payment.method}
        </li>
        {payment.card && (
          <li className={listStyle}>
            <b className={subTitle}>카드 번호</b>
            {payment.card.number}
          </li>
        )}
        {payment.approvedAt && (
          <li className={listStyle}>
            <b className={subTitle}>결제승인날짜</b>
            {formatTime(payment.approvedAt)}
          </li>
        )}
        {payment.totalAmount && (
          <li className="flex justify-between mt-4 border-t border-lightGray pt-6">
            <b className={subTitle}>결제 금액</b>
            <b className={subTitle}>
              {priceFormat(payment.totalAmount) + "원"}
            </b>
          </li>
        )}
      </ul>
      <div className="flex w-1/3 gap-4 mt-10 sm:w-[90%]">
        <div className="w-1/2 h-14">
          <Button styleType="secondary" style="text-xl font-bold">
            <Link href={URLS.rootURL}>홈으로</Link>
          </Button>
        </div>
        <div className="w-1/2 h-14">
          <Button styleType="primary" style="text-xl font-bold">
            <Link href={URLS.ORDER_HISTORY}>주문 내역 확인</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
