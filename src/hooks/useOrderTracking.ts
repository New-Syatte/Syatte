// src/hooks/useOrderTracking.ts
import useSWR from "swr";
import { Order } from "@/type/order";
import { DeliveryTrackingResponse } from "@/type/order";
import { DELIVERY_STATUS } from "@/constants/deliveryStatus";

export function useOrderTracking(order: Order) {
  const { data, error, mutate } = useSWR<DeliveryTrackingResponse, Error>(
    order.shippingInfo?.trackingNumber
      ? [
          `delivery-tracking`,
          order.shippingInfo.carrierId,
          order.shippingInfo.trackingNumber,
        ]
      : null,
    async ([_, carrierId, trackingNumber]) => {
      const response = await fetch("/api/delivery/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrierId, trackingNumber }),
      });

      if (!response.ok) {
        throw new Error("배송 조회 실패");
      }

      return response.json();
    },
    {
      // 60초마다 자동 갱신
      refreshInterval: 60000,
      // 포커스시 자동 갱신
      revalidateOnFocus: true,
    },
  );

  // 배송 상태 업데이트 함수
  const updateOrderStatus = async () => {
    if (!order.shippingInfo?.trackingNumber) return;

    const trackingStatus = data?.data?.track?.lastEvent?.status?.code;
    const orderStatus =
      DELIVERY_STATUS[trackingStatus as keyof typeof DELIVERY_STATUS] ||
      "unknown";
    console.log("orderStatus", orderStatus);
    // 현재 상태와 새로운 상태가 같으면 업데이트하지 않음
    if (order.orderStatus === orderStatus) {
      return;
    }

    try {
      const response = await fetch("/api/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id,
          status: orderStatus, // 매핑된 상태값 사용
          events: data?.data?.track?.events?.edges,
        }),
      });

      if (!response.ok) {
        throw new Error("주문 상태 업데이트 실패");
      }

      mutate();
    } catch (error) {
      console.error("주문 상태 업데이트 중 오류:", error);
    }
  };

  // 배송 추적 시작
  const startTracking = async () => {
    if (
      !order.shippingInfo?.carrierId ||
      !order.shippingInfo?.trackingNumber ||
      order.orderStatus === "payed" ||
      order.orderStatus === "preparing" ||
      order.orderStatus === "canceled"
    ) {
      return;
    }

    await mutate();
    await updateOrderStatus();
  };

  return {
    trackingData: data,
    isLoading: !error && !data,
    isError: error,
    startTracking,
    refreshTracking: mutate,
  };
}