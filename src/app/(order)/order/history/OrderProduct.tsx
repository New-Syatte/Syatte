"use client";

import { Order } from "@/type/order";
import Image from "next/image";
import OrderStatus from "@/components/order/OrderStatus";
import { formatTime } from "@/utils/formatTime";
import priceFormat from "@/utils/priceFormat";

interface OrderProductProps {
  order: Order;
  onTrackDelivery: (order: Order) => void;
  disabled: boolean;
}

export default function OrderProduct({
  order,
  onTrackDelivery,
  disabled,
}: OrderProductProps) {
  const {
    orderDate,
    cartItems,
    orderAmount,
    orderStatus,
    shippingInfo,
    createdAt,
  } = order;

  const handleTrackDelivery = () => {
    onTrackDelivery(order);
  };

  return (
    <div className="w-full border border-lightGray rounded-md p-6 sm:p-4">
      <div className="flex justify-between items-center border-b border-lightGray pb-4 sm:flex-col sm:items-start sm:gap-2">
        <div className="flex gap-4 items-center sm:flex-col sm:items-start sm:gap-2">
          <p className="text-lg sm:text-base text-darkGray">
            주문일자: {orderDate}
          </p>
          <p className="text-lg sm:text-base text-darkGray">
            주문시간: {formatTime(createdAt).split(" ")[1]}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <OrderStatus order={order} className="text-lg sm:text-base" />
          {shippingInfo?.trackingNumber && (
            <button
              onClick={handleTrackDelivery}
              className="text-lg sm:text-base text-darkGray hover:text-black disabled:opacity-50"
              disabled={disabled}
            >
              {disabled ? "배송 조회중..." : "배송 조회"}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="w-[100px] h-[100px] sm:w-[77px] sm:h-[77px] border border-lightGray flex justify-center items-center">
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "80%", height: "auto" }}
                />
              </div>
              <div>
                <p className="text-lg sm:text-base">{item.name}</p>
                <p className="text-base sm:text-sm text-darkGray">
                  {item.cartQuantity}개
                </p>
              </div>
            </div>
            <p className="text-lg sm:text-base font-bold">
              {priceFormat(item.price * item.cartQuantity)}원
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t border-lightGray pt-4">
        <p className="text-lg sm:text-base">총 결제금액</p>
        <p className="text-xl sm:text-lg font-bold">
          {priceFormat(orderAmount)}원
        </p>
      </div>
    </div>
  );
}
