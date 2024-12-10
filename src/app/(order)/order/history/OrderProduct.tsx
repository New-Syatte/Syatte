"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Order } from "@/type/order";
import { useEffect, useState } from "react";
import URLS from "@/constants/urls";
import OrderStatus from "@/components/order/OrderStatus";
import { useOrders } from "@/hooks/useOrders";

interface OrderProductProps {
  order: Order;
  index?: number;
}

export default function OrderProduct({ order, index = 0 }: OrderProductProps) {
  const pathname = usePathname();
  const orderTime = new Date(order.createdAt).toISOString();
  const [isDetail, setIsDetail] = useState(false);
  const { trackDelivery } = useOrders();

  useEffect(() => {
    if (pathname.includes(URLS.ORDER_DETAILS)) {
      trackDelivery(order);
    }
  }, [order, trackDelivery, pathname]);

  useEffect(() => {
    setIsDetail(pathname !== "/order/history");
  }, [pathname]);

  const renderProductItem = (product: any, itemIndex: number) => {
    const discountedPrice =
      product.price - product.price * (product.discount / 100);

    return (
      <div
        key={itemIndex}
        className="flex items-center justify-between px-8 sm:px-4 py-[10px] h-[170px] sm:h-auto"
      >
        <div className="flex justify-start items-center gap-16 sm:gap-4 w-1/3 sm:w-auto">
          <p className="text-base sm:text-sm">{itemIndex + 1}</p>
          <div className="w-20 h-20 sm:w-[77px] sm:h-[77px] flex justify-center items-center border border-lightGray">
            <Image
              src={product.imageURL || ""}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              className="w-[70%] sm:w-[80%] h-auto"
            />
          </div>
          <div className="flex flex-col justify-start items-start sm:w-3/5">
            <p className="font-normal text-black mb-2 whitespace-nowrap text-lg sm:text-sm">
              {product.name}
            </p>
            <OrderStatus order={order} className="sm:text-xs" />
            <div className="hidden sm:flex sm:w-full sm:justify-between sm:items-center sm:font-bold sm:mt-2">
              <p>{product.cartQuantity}개</p>
              <p>
                {Number(
                  discountedPrice * product.cartQuantity,
                ).toLocaleString()}
                원
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex justify-end items-center text-lg sm:hidden">
          <div className="flex justify-end items-center w-1/2 gap-20">
            <p className="font-normal whitespace-nowrap">
              {product.cartQuantity}개
            </p>
            <p className="font-normal whitespace-nowrap">
              {Number(discountedPrice * product.cartQuantity).toLocaleString()}
              원
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full pb-10">
      <Link
        href={!isDetail ? `${URLS.ORDER_DETAILS}/${order._id}` : "/"}
        onClick={e => {
          if (isDetail) {
            e.preventDefault();
          }
        }}
        className={`
          flex sm:flex-col sm:gap-2 w-full h-[60px] sm:h-auto 
          justify-between sm:justify-start sm:items-start pb-3 
          bg-bgWhiteSmoke border border-lightGray rounded-md p-3 px-4
          ${!isDetail ? "cursor-pointer" : "cursor-default"}
          transition-all duration-600 ease-in-out
        `}
      >
        <div className="flex sm:flex-col sm:items-start justify-start items-center gap-10 sm:gap-1 text-sm font-bold">
          <h3>
            <span>주문일자: </span>
            <span className="text-darkGray font-normal">
              {orderTime.split("T")[0]}
            </span>
          </h3>
          <h3>
            <span>주문번호: </span>
            <span className="text-darkGray font-normal">{order._id}</span>
          </h3>
        </div>
        <div className="flex sm:w-full sm:justify-between justify-end items-center gap-10 font-bold text-lg">
          <h3 className="text-lg">총 결제금액</h3>
          <h3 className="text-[22px]">
            {order.orderAmount ? order.orderAmount.toLocaleString() : "0"}원
          </h3>
        </div>
      </Link>
      {order.cartItems?.map((product, idx) => renderProductItem(product, idx))}
    </div>
  );
}
