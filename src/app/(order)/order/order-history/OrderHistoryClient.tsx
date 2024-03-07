"use client";
import StatusProgress from "./StatusProgress";
import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import OrderList from "./OrderList";
import { getOrders } from "@/services/sanity/orders";
import { trackDelivery } from "@/services/deliveryTracker";
import getDeliveryToken from "@/app/actions/getDeliveryToken";
import useSWR from "swr";
import { useState, useEffect } from "react";
import {
  Order,
  TrackingResponseError,
  DeliveryTrackingResponse,
} from "@/model/order";
import changeOrderStatus from "./changeOrderStatus";

interface OrderHistoryClientProps {
  userEmail: string;
}

const OrderHistoryClient = ({ userEmail }: OrderHistoryClientProps) => {
  const { data: orders, error } = useSWR(["orders", userEmail], () =>
    getOrders(userEmail),
  );
  const [filteredOrders, setFilteredOrders] = useState([]);
  console.log(orders);

  // 1. orders(data)에서 shippingInfo가 있는 경우,해당 품목 필터링
  // 2. 각 품목에 trackDelivery를 사용하여 배송 상태 추적 (carrierId, trackingNumber, accessToken 필요)
  // 2-1. getDeliveryToken을 사용하여 accessToken 발급
  // 3. 배송 추적한 결과에 따라 updateOrderStatus 사용하여 orderStatus 업데이트(이거는 배송 추적 후 응답 데이터에 따라서 업데이트 해야함)

  // 03.07 05:52pm 김경원

  // mutate를 사용하여 orders를 업데이트하는게 나아보임. useEffect는 렌더링 될 때마다 실행되기 때문에, orders가 렌더링 될 때마다 배송 추적을 다시 실행하게 됨.
  // refactoring할때 mutate를 사용하여 orders를 업데이트하는 방법을 사용해보자.

  useEffect(() => {
    if (orders) {
      const filteredOrders = orders.filter(
        (order: Order) => order.shippingInfo,
      );
      setFilteredOrders(filteredOrders);
    }
  }, [orders]);

  useEffect(() => {
    if (filteredOrders) {
      filteredOrders.forEach(async (order: Order) => {
        const { carrierId, trackingNumber } = order.shippingInfo;
        const accessToken = await getDeliveryToken(false);
        const deliveryStatus: DeliveryTrackingResponse = await trackDelivery(
          carrierId,
          trackingNumber,
          accessToken,
        );
        console.log("deliveryStatus", deliveryStatus);
        let finalDeliveryStatus = deliveryStatus;

        // accessToken 만료 시 재발급 후 배송 추적.
        if (
          deliveryStatus.errors?.find(
            (error: TrackingResponseError) =>
              error.extensions.code === "UNAUTHENTICATED",
          )
        ) {
          const newAccessToken = await getDeliveryToken(true);
          finalDeliveryStatus = await trackDelivery(
            carrierId,
            trackingNumber,
            newAccessToken,
          );
        }

        await changeOrderStatus(finalDeliveryStatus, order);
      });
    }
  }, [filteredOrders]);

  if (error) return <div>Failed to load orders</div>;
  if (!orders) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-y-40">
      <StatusProgress orders={orders} />
      <div>
        <div className="flex justify-between mb-[30px]">
          <h2 className="text-xl font-semibold">주문 내용</h2>
          <PeriodSelector />
        </div>
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default OrderHistoryClient;
