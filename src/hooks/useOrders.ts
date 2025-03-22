import { useSession } from "next-auth/react";
import { getOrdersByUserInfo } from "@/services/sanity/orders";
import useSWR from "swr";
import { Order } from "@/type/order";

export function useOrders() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;
  
  // 이메일 또는 userId로 주문 데이터 가져오기 (카카오 로그인 대응)
  const {
    data: orders,
    isLoading,
    error,
    mutate: refreshOrders,
  } = useSWR<Order[], Error>(
    // 세션이 있고 최소한 userId가 있으면 조회 시도
    (userId && status === "authenticated") 
      ? ["orders-by-user-info", userId, userEmail] 
      : null, 
    () => getOrdersByUserInfo(userId!, userEmail)
  );
  
  return {
    orders,
    isLoading: isLoading || status === "loading",
    error,
    refreshOrders,
  };
}
