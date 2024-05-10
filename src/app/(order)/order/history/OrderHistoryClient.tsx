"use client";
import StatusProgress from "./StatusProgress";
import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import OrderList from "./OrderList";
import { getOrders, updateOrderStatus } from "@/services/sanity/orders";
import useSWR from "swr";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDER, selectOrders } from "@/redux/slice/orderSlice";
import { Order } from "@/type/order";
import { TrackingResponseEvent } from "@/type/order";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";

interface OrderHistoryClientProps {
  userEmail: string;
}

const OrderHistoryClient = ({ userEmail }: OrderHistoryClientProps) => {
  const {
    data: orders,
    error,
    mutate,
  } = useSWR(["orders", userEmail], () => getOrders(userEmail));

  const dispatch = useDispatch();
  const reduxOrders = useSelector(selectOrders);
  useEffect(() => {
    if (reduxOrders && orders) {
      reduxOrders.forEach(reduxOrder => {
        const matchedOrder = orders.find(
          (order: Order) => order._id === reduxOrder._id,
        );
        if (matchedOrder) {
          if (
            matchedOrder.status !== reduxOrder.orderStatus &&
            reduxOrder.shippingInfo?.events
          ) {
            (async () => {
              await updateOrderStatus(
                matchedOrder._id,
                reduxOrder.orderStatus,
                reduxOrder.shippingInfo.events as TrackingResponseEvent[],
              );
              // update된 orders를 mutate로 캐시에 저장.
              mutate();
            })();
          }
        }
      });
    }
  }, [reduxOrders]);

  useEffect(() => {
    if (orders) {
      dispatch(STORE_ORDER(orders));
    }
  }, [orders]);

  if (error) return <div>Failed to load orders</div>;
  if (!orders) return <Loader />;

  return (
    <section className="w-full flex flex-col gap-y-40">
      <div className="flex flex-col justify-start items-start">
        <Heading title="배송상황" fontSize="3xl" />
        <div className="border-b border-lightGray mb-7 w-full" />
        <StatusProgress />
      </div>
      <div>
        <div className="flex justify-between mb-[30px] border-b border-lightGray">
          <Heading title="주문내역" fontSize="3xl" />
          <PeriodSelector />
        </div>
        <OrderList />
      </div>
    </section>
  );
};

export default OrderHistoryClient;
