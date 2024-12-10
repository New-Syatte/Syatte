export const DELIVERY_STATUS = {
  // 배송 준비중
  INFORMATION_RECEIVED: "ready",
  AT_PICKUP: "ready",

  // 배송중
  IN_TRANSIT: "moving",
  OUT_FOR_DELIVERY: "moving",

  // 배송 완료
  DELIVERED: "done",

  // 배송 실패/보류
  DELIVERY_FAILED: "failed",
  PENDING: "pending",

  // 기타
  UNKNOWN: "unknown",
} as const;

export type DeliveryStatusCode = keyof typeof DELIVERY_STATUS;
export type OrderStatusType = (typeof DELIVERY_STATUS)[DeliveryStatusCode];
