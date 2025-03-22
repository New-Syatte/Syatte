"use client";

import { useOrders } from "@/hooks/useOrders";
import OrderProduct from "./OrderProduct";
import { Order } from "@/type/order";
import { useEffect, useState } from "react";

export default function OrderList() {
  const { orders, isLoading } = useOrders();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 초기 로딩 상태를 관리하기 위한 useEffect
  useEffect(() => {
    // orders 데이터가 로드되었거나 로딩이 완료되면 초기 로딩 상태를 false로 설정
    if (!isLoading || orders) {
      // 약간의 지연 시간을 두어 화면 깜빡임 방지
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, orders]);

  // 초기 로딩 중일 때 
  if (isInitialLoading || isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-3xl text-[#dddddd] font-bold">
          데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  // 로딩이 완료되고 데이터가 없을 때
  if (!isLoading && (!orders || orders.length === 0)) {
    return (
      <div className="w-full h-96 min-h-screen flex justify-center items-center">
        <p className="text-3xl text-[#dddddd] font-bold">
          주문 내역이 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 min-h-screen">
      {orders
        ?.sort(
          (a: Order, b: Order) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((order: Order) => (
          <OrderProduct key={order._id} order={order} />
        ))}
    </div>
  );
}
