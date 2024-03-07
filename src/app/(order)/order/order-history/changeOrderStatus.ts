import { updateOrderStatus } from "@/services/sanity/orders";
import { DeliveryTrackingResponse, Order } from "@/model/order";

// 응답에 따른 status 변경 처리
const changeOrderStatus = async (
  deliveryStatus: DeliveryTrackingResponse,
  order: Order,
) => {
  const { lastEvent } = deliveryStatus.data.track;
  const { code } = lastEvent.status;
  if (code === "INFORMATION_RECEIVED") {
    await updateOrderStatus(order._id, "ready");
  }
  if (
    code === "AT_PICKUP" ||
    code === "IN_TRANSIT" ||
    code === "OUT_FOR_DELIVERY"
  ) {
    await updateOrderStatus(order._id, "moving");
  }
  if (code === "DELIVERED") {
    await updateOrderStatus(order._id, "done");
  }
  // 예외 사항 (AVAILABLE_FOR_PICKUP은 의논 필요)
  if (
    code === "ATTEMPT_FAIL" ||
    code === "AVAILABLE_FOR_PICKUP" ||
    code === "EXCEPTION" ||
    code === "UNKNOWN"
  ) {
    await updateOrderStatus(order._id, "unknown");
  }
};

export default changeOrderStatus;
