"use client";
import React, { useState } from "react";
import { Order } from "@/model/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "@/components/pagination/Pagination";
import OrderProduct from "../OrderProduct";
import { selectOrders } from "@/redux/slice/orderSlice";

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

  return (
    <>
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
    </>
  );
};

export default OrderList;
