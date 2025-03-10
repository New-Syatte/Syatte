"use client";

import { useOrders } from "@/hooks/useOrders";
import OrderProduct from "./OrderProduct";
import { Order } from "@/type/order";

export default function OrderList() {
  const { orders, isLoading } = useOrders();

  if (!orders?.length && !isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-3xl text-[#dddddd] font-bold">
          데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!isLoading && !orders?.length) {
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
