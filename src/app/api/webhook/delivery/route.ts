import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/services/sanity/orders";
import { client } from "@/services/sanity/sanity";
import { trackDelivery, unregisterWebhook } from "@/services/deliveryTracker";
import { DELIVERY_STATUS } from "@/constants/deliveryStatus";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { carrierId, trackingNumber } = data;

    if (!carrierId || !trackingNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 배송 정보 조회
    const trackingResult = await trackDelivery(carrierId, trackingNumber);

    if (!trackingResult.data?.track) {
      return NextResponse.json(
        { error: "Failed to fetch tracking information" },
        { status: 500 },
      );
    }

    // trackingNumber로 해당 주문 찾기
    const order = await client.fetch(
      `*[_type == "order" && shippingInfo.trackingNumber == $trackingNumber][0]`,
      { trackingNumber },
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 배송 상태 매핑
    const status = trackingResult.data.track.lastEvent.status.code;
    const orderStatus =
      DELIVERY_STATUS[status as keyof typeof DELIVERY_STATUS] ||
      DELIVERY_STATUS.UNKNOWN;

    // 이전 상태와 동일한 경우 업데이트 스킵
    if (order.orderStatus === orderStatus) {
      return NextResponse.json(
        { success: true, message: "Status unchanged" },
        { status: 202 },
      );
    }

    // Sanity 업데이트
    await updateOrderStatus(
      order._id,
      orderStatus,
      trackingResult.data.track.events.edges,
    );

    // 배송 완료나 실패 상태인 경우 webhook 해제
    if (["done", "failed"].includes(orderStatus)) {
      try {
        await unregisterWebhook(carrierId, trackingNumber);
      } catch (error) {
        console.error("Failed to unregister webhook:", error);
        // webhook 해제 실패는 전체 프로세스를 실패시키지 않음
      }
    }

    // 202 Accepted 응답
    return NextResponse.json(
      {
        success: true,
        data: {
          previousStatus: order.orderStatus,
          newStatus: orderStatus,
        },
      },
      { status: 202 },
    );
  } catch (error) {
    console.error("Delivery webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
