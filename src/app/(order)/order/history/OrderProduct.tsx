"use client";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ORDER_STATUS } from "@/constants/status";
import { Order } from "@/type/order";
import { useDispatch } from "react-redux";
import { trackDeliveryThunk } from "@/redux/slice/orderSlice";
import { useEffect } from "react";
import URLS from "@/constants/urls";

interface OrderProductProps {
  order: Order;
  index?: number;
}

const OrderProduct = ({ order, index = 0 }: OrderProductProps) => {
  const pathname = usePathname();
  const orderTime = new Date(order.createdAt).toISOString();
  const orderStatus = order.orderStatus;

  const statusTitleArr = ORDER_STATUS.map(status => status.title);
  const statusArray = ORDER_STATUS.map(status => status.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(trackDeliveryThunk(order));
  }, [dispatch, orderStatus]);

  return (
    <div className={`w-full pb-10`} key={index}>
      <div
        className={`flex w-full justify-between border-b-2 ${
          pathname == "/order/order-history"
            ? "border-lightGray"
            : "border-colorBlack"
        } pb-3`}
      >
        <h3>{`${orderTime.split("T")[0].replaceAll("-", ".")}${
          pathname === "/order/order-history" ? "" : ` / ${order._id}`
        }`}</h3>
        {pathname && pathname === "/order/order-history" && (
          <Link
            href={`${URLS.ORDER_DETAILS}/${order._id}`}
            className="flex items-center text-darkgray text-md hover:underline"
          >
            <p>주문상세</p> <BsChevronRight />
          </Link>
        )}
      </div>
      {order.cartItems &&
        order.cartItems.map((product, index) => (
          <div
            key={index}
            className="h-[170px] py-[10px] flex items-center justify-between"
          >
            <div className="flex justify-start items-center gap-16 w-1/3">
              <Image
                src={product.imageURL || ""}
                alt={"제품사진"}
                width={150}
                height={150}
              />
              <div className="flex flex-col justify-start items-start">
                <p className="font-normal text-black mb-2 whitespace-nowrap">
                  {product.name}
                </p>
                <p className="font-normal text-darkGray whitespace-nowrap">{`${
                  product.cartQuantity
                }개 / ${Number(
                  product.price * product.cartQuantity,
                ).toLocaleString()} won`}</p>
              </div>
            </div>
            <div className="w-1/3 flex justify-end items-center">
              <div className="flex justify-center items-center w-1/2 text-darkgray">
                {statusTitleArr[statusArray.indexOf(order.orderStatus)]}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderProduct;
