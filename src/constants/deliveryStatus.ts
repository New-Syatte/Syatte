export const DELIVERY_STATUS = {
  UNKNOWN: "unknown",
  INFORMATION_RECEIVED: "ready",
  AT_PICKUP: "ready",
  IN_TRANSIT: "moving",
  OUT_FOR_DELIVERY: "moving",
  ATTEMPT_FAIL: "unknown",
  DELIVERED: "done",
  AVAILABLE_FOR_PICKUP: "moving",
  EXCEPTION: "unknown",
} as const;

export type DeliveryStatusCode = keyof typeof DELIVERY_STATUS;
export type OrderStatusType = (typeof DELIVERY_STATUS)[DeliveryStatusCode];
