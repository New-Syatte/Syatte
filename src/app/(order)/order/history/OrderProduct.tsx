"use client";

import { Order } from "@/type/order";
import Image from "next/image";
import OrderStatus from "@/components/order/OrderStatus";
import { formatTime } from "@/utils/formatTime";
import priceFormat from "@/utils/priceFormat";
import { getDiscountPrice } from "@/utils/getDiscount";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface OrderProductProps {
  order: Order;
}

export default function OrderProduct({ order }: OrderProductProps) {
  const { orderDate, cartItems, orderAmount, shippingInfo, createdAt } = order;
  const pathname = usePathname();

  return (
    <div className="w-full border border-lightGray rounded-md p-6 sm:p-4">
      <Link
        href={`${
          pathname === "/order/history"
            ? `/order/details/${order._id}`
            : "javascript:void(0);"
        }`}
        className={
          "flex justify-between items-center border-b border-lightGray pb-4 sm:flex-col sm:items-start sm:gap-2" +
          ` ${
            pathname === "/order/history" ? "cursor-pointer" : "cursor-default"
          }`
        }
      >
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
        </div>
      </Link>
      <div className="flex flex-col gap-4 py-4">
        {cartItems.map(item => (
          <div
            key={item._key}
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
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-[10px] h-[10px]"
                      style={{ backgroundColor: item.colorCode }}
                    />
                    <p className="text-base sm:text-sm text-darkGray">
                      {item.color}
                    </p>
                  </div>
                  <p className="text-base sm:text-sm text-darkGray">
                    {item.size}
                  </p>
                </div>
                <p className="text-base sm:text-sm text-darkGray">
                  {item.quantity}개
                </p>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-end">
              <p className="text-lg sm:text-base font-bold text-darkGray line-through opacity-50">
                {priceFormat(item.price * item.quantity)}원
              </p>
              <p className="text-lg sm:text-base font-bold text-colorRed line-through opacity-50">
                {item.discount}%
              </p>
              <p className="text-lg sm:text-base font-bold">
                {priceFormat(
                  getDiscountPrice(item.price, item.discount) * item.quantity,
                )}
                원
              </p>
            </div>
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
