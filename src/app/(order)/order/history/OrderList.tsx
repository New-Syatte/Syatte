"use client";
import React, { useState } from "react";
import { Order } from "@/type/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "@/components/pagination/Pagination";
import OrderProduct from "./OrderProduct";
import { selectOrders } from "@/redux/slice/orderSlice";
import DocsIcon from "@/assets/order/docs.svg";
import Image from "next/image";

const OrderList = () => {
  //기간 별 filtering
  const startDate = useSelector((state: RootState) => state.period.startDate);
  const endDate = useSelector((state: RootState) => state.period.endDate);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const orders = useSelector(selectOrders);

  const filteredOrders: Order[] | undefined = orders
    ?.filter(order => {
      const orderDate = new Date(order.createdAt);
      return startDate <= orderDate && orderDate < endDate;
    })
    .sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return bDate.getTime() - aDate.getTime();
    });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );
  if (currentOrders.length === 0 || !currentOrders)
    return (
      <div className="w-full min-h-[50vh] flex flex-col justify-center items-center gap-6">
        <div className="w-1/8">
          <Image
            src={DocsIcon}
            alt="docs-icon"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <p className="text-[22px] text-lightGray font-bold">
          주문 내역이 없습니다.
        </p>
      </div>
    );
  return (
    <div>
      {currentOrders?.map((order, index) => (
        <OrderProduct order={order} index={index} key={index} />
      ))}
      <Pagination
        currentPage={currentPage}
        productsPerPage={ordersPerPage}
        setCurrentPage={setCurrentPage}
        totalProducts={orders.length}
      />
    </div>
  );
};

export default OrderList;
