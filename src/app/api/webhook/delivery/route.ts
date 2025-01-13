import { NextRequest, NextResponse } from "next/server";
import { createDeliveryQueue } from "@/services/sanity/deliveryQueue";
import { getOrderByDeliveryInfo } from "@/services/sanity/orders";

// deliveryTracker webhook 요청 시 배송완료 큐 생성 및 큐 처리 트리거
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

    // 큐 생성
    const { orderId } = await getOrderByDeliveryInfo(carrierId, trackingNumber);
    await createDeliveryQueue({
      carrierId,
      trackingNumber,
      orderId,
    });

    // 큐 처리는 비동기로 트리거
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/queue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carrierId, trackingNumber, orderId }),
    }).catch(error => {
      console.error("Failed to trigger queue processing:", error);
    });

    // 즉시 202 응답 반환
    return NextResponse.json(
      { message: "Delivery tracking queued" },
      { status: 202 },
    );
  } catch (error) {
    console.error("Delivery webhook endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
