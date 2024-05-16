"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ORDER_STATUS } from "@/constants/status";
import { Order } from "@/type/order";
import { useDispatch } from "react-redux";
import { trackDeliveryThunk } from "@/redux/slice/orderSlice";
import { useEffect, useState } from "react";
import URLS from "@/constants/urls";
import { Mobile } from "@/hooks/useMediaQuery";

interface OrderProductProps {
  order: Order;
  index?: number;
}

const OrderProduct = ({ order, index = 0 }: OrderProductProps) => {
  const pathname = usePathname();
  const orderTime = new Date(order.createdAt).toISOString();
  const orderStatus = order.orderStatus;
  const [isDetail, setIsDetail] = useState(false);

  const statusTitleArr = ORDER_STATUS.map(status => status.title);
  const statusArray = ORDER_STATUS.map(status => status.value);
  const dispatch = useDispatch();

  const isMobile = Mobile();

  useEffect(() => {
    dispatch<any>(trackDeliveryThunk(order));
  }, [dispatch, orderStatus]);

  useEffect(() => {
    if (pathname === "/order/history") {
      setIsDetail(false);
    } else {
      setIsDetail(true);
    }
  }, []);

  return (
    <div className={`w-full pb-10`} key={index}>
      <Link
        href={
          !isDetail
            ? `${URLS.ORDER_DETAILS}/${order._id}`
            : "javascript:void(0)"
        }
        className={`flex sm:flex-col sm:gap-2 w-full h-[60px] sm:h-auto justify-between sm:justify-start sm:items-start pb-3 bg-bgWhiteSmoke border border-lightGray rounded-md p-3 ${
          !isDetail ? "cursor-pointer" : "cursor-default"
        } px-4 transition-all transition-duration-600 ease-in-out`}
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
            {order.orderAmount.toLocaleString()}원
          </h3>
        </div>
      </Link>
      {order.cartItems &&
        order.cartItems.map((product, index) => {
          if (isMobile)
            return (
              <div
                key={index}
                className="w-full py-[10px] flex items-center justify-between text-sm"
              >
                <p>{index + 1}</p>
                <div className="w-[77px] h-[77px] flex justify-center items-center border border-lightGray">
                  <Image
                    src={product.imageURL || ""}
                    alt={"제품사진"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "80%", height: "auto" }}
                  />
                </div>
                <div className="flex flex-col w-3/5">
                  <div className="flex flex-col justify-start items-start mb-1">
                    <p className="font-normal text-black whitespace-nowrap">
                      {product.name}
                    </p>
                    <p className="text-xs text-darkGray whitespace-nowrap">
                      {statusTitleArr[statusArray.indexOf(order.orderStatus)]}
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-bold whitespace-nowrap">
                    <p>{product.cartQuantity}개</p>
                    <p>
                      {Number(
                        product.price * product.cartQuantity,
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </div>
              </div>
            );
          if (!isMobile)
            return (
              <div
                key={index}
                className="h-[170px] py-[10px] flex items-center justify-between px-8"
              >
                <div className="flex justify-start items-center gap-16 w-1/3">
                  <p>{index + 1}</p>
                  <div className="w-20 h-20 flex justify-center items-center border border-lightGray">
                    <Image
                      src={product.imageURL || ""}
                      alt={"제품사진"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "70%", height: "auto" }}
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-normal text-black mb-2 whitespace-nowrap text-lg">
                      {product.name}
                    </p>
                    <p className="font-normal text-darkGray whitespace-nowrap">
                      {statusTitleArr[statusArray.indexOf(order.orderStatus)]}
                    </p>
                  </div>
                </div>
                <div className="w-1/3 flex justify-end items-center text-lg">
                  <div className="flex justify-end items-center w-1/2 gap-20">
                    <p className="font-normal whitespace-nowrap">
                      {product.cartQuantity}개
                    </p>
                    <p className="font-normal whitespace-nowrap">
                      {Number(
                        product.price * product.cartQuantity,
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </div>
              </div>
            );
        })}
    </div>
  );
};

export default OrderProduct;
