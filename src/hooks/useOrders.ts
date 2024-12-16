import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_ORDER,
  selectOrders,
  trackDeliveryThunk,
} from "@/redux/slice/orderSlice";
import { getOrders } from "@/services/sanity/orders";
import useSWR from "swr";
import { Order } from "@/type/order";
import { useEffect, useRef, useTransition } from "react";

export function useOrders() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useDispatch();
  const updatingRef = useRef<{ [key: string]: boolean }>({});
  const [isPending, startTransition] = useTransition();

  // SWR로 주문 데이터 가져오기
  const {
    data: orders,
    error,
    mutate,
  } = useSWR(userId ? ["orders", userId] : null, () => getOrders(userId!));

  // Redux에서 주문 상태 가져오기
  const reduxOrders = useSelector(selectOrders);

  // 주문 상태 동기화
  useEffect(() => {
    if (reduxOrders && orders) {
      reduxOrders.forEach(reduxOrder => {
        const matchedOrder = orders.find(
          (order: Order) => order._id === reduxOrder._id,
        );
        if (matchedOrder) {
          if (
            matchedOrder.orderStatus !== reduxOrder.orderStatus &&
            reduxOrder.shippingInfo?.events &&
            !updatingRef.current[matchedOrder._id]
          ) {
            startTransition(async () => {
              try {
                updatingRef.current[matchedOrder._id] = true;
                const response = await fetch("/api/orders/update-status", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    orderId: matchedOrder._id,
                    status: reduxOrder.orderStatus,
                    events: reduxOrder.shippingInfo.events,
                  }),
                });

                if (!response.ok) {
                  throw new Error("Failed to update order status");
                }

                await mutate();
              } catch (error) {
                console.error("Failed to update order status:", error);
              } finally {
                delete updatingRef.current[matchedOrder._id];
              }
            });
          }
        }
      });
    }
  }, [reduxOrders, orders, mutate]);

  // Redux 스토어 업데이트
  useEffect(() => {
    if (orders) {
      dispatch(STORE_ORDER(orders));
    }
  }, [orders, dispatch]);

  // 배송 추적 시작 - 배송 정보가 있고 결제완료 이후 상태일 때만 실행
  const trackDelivery = (order: Order) => {
    if (
      order.shippingInfo?.carrierId &&
      order.shippingInfo?.trackingNumber &&
      order.orderStatus !== "payed" &&
      order.orderStatus !== "preparing" &&
      order.orderStatus !== "canceled"
    ) {
      startTransition(() => {
        dispatch(trackDeliveryThunk(order) as any);
      });
    }
  };

  return {
    orders,
    error,
    isLoading: !orders && !error,
    trackDelivery,
    isPending,
  };
}
