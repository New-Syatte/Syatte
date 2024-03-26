"use client";
import StatusProgress from "./StatusProgress";
import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import OrderList from "./OrderList";
import { getOrders, updateOrderStatus } from "@/services/sanity/orders";
import useSWR from "swr";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDER, selectOrders } from "@/redux/slice/orderSlice";
import { Order } from "@/model/order";
import { TrackingResponseEvent } from "@/model/order";

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
            reduxOrder.shippingInfo.events
          ) {
            (async () => {
              await updateOrderStatus(
                matchedOrder._id,
                reduxOrder.orderStatus,
                reduxOrder.shippingInfo.events as TrackingResponseEvent[],
              );
              console.log(matchedOrder, "updated");
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
  if (!orders) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-y-40">
      <StatusProgress />
      <div>
        <div className="flex justify-between mb-[30px]">
          <h2 className="text-xl font-semibold">주문 내용</h2>
          <PeriodSelector />
        </div>
        <OrderList />
      </div>
    </div>
  );
};

export default OrderHistoryClient;
