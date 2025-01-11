import { useSession } from "next-auth/react";
import { getOrders } from "@/services/sanity/orders";
import useSWR from "swr";
import { Order } from "@/type/order";

export function useOrders() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // SWR로 주문 데이터 가져오기
  const {
    data: orders,
    isLoading,
    error,
    mutate,
  } = useSWR<Order[], Error>(userId ? ["orders", userId] : null, () =>
    getOrders(userId!),
  );

  return {
    orders,
    error,
    isLoading,
    refreshOrders: mutate,
  };
}
