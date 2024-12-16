"use client";

import { useOrders } from "@/hooks/useOrders";
import OrderProduct from "./OrderProduct";
import { Order } from "@/type/order";

export default function OrderList() {
  const { orders, trackDelivery, isPending } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p className="text-3xl text-[#dddddd] font-bold">
          주문 내역이 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10">
      {orders.map((order: Order) => (
        <OrderProduct
          key={order._id}
          order={order}
          onTrackDelivery={trackDelivery}
          disabled={isPending}
        />
      ))}
    </div>
  );
}
