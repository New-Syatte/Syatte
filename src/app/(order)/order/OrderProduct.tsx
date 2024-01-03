"use client";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import { Order } from "@/model/order";
import NextLink from "@/components/NextLink/NextLink";
import { usePathname } from "next/navigation";
import { ORDER_STATUS } from "@/constants/status";

interface OrderProductProps {
  order: Order;
  index?: number;
}

const OrderProduct = ({ order, index = 0 }: OrderProductProps) => {
  const pathname = usePathname();
  const orderTime = new Date(order.createdAt).toISOString();

  const statusTitleArr = ORDER_STATUS.map(status => status.title);
  const statusArray = ORDER_STATUS.map(status => status.value);

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
          <NextLink
            href={`/order/order-details/${order._id}`}
            className="flex items-center text-darkgray text-md hover:underline"
          >
            <p>주문상세</p> <BsChevronRight />
          </NextLink>
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
            <div className="w-1/3 flex justify-end items-center">
              {order.orderStatus === "moving" && (
                <a
                  className="btn_tiny"
                  href={"#"}
                  // href={`https://tracker.delivery/#/${order.deliveryCompany}/${order.deliveryNumber}`}
                  target="_blank"
                >
                  배송조회(준비중)
                </a>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderProduct;
