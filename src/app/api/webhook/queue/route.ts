import { NextRequest, NextResponse } from "next/server";
import { updateQueueStatus } from "@/services/sanity/deliveryQueue";
import { trackDelivery, unRegisterWebhook } from "@/services/deliveryTracker";
import { updateOrderStatus } from "@/services/sanity/orders";
import { DELIVERY_STATUS } from "@/constants/deliveryStatus";
import { client } from "@/services/sanity";

// deliveryTracker webhook 요청 시 배송 완료 큐 처리
const MAX_RETRY_COUNT = 3;
const PROCESSING_TIMEOUT = 5 * 60 * 1000; // 5분

export async function POST(req: NextRequest) {
  const { carrierId, trackingNumber, orderId } = await req.json();

  try {
    // 1. 현재 큐 상태 확인 및 lock 확보
    const currentQueue = await client.fetch(
      `*[_type == "deliveryQueue" && order._ref == $orderId][0]{
        _id,
        status,
        retryCount,
        processedAt
      }`,
      { orderId },
    );

    // 처리 중인 큐 확인
    if (currentQueue?.status === "processing") {
      const processedAt = new Date(currentQueue.processedAt);
      const now = new Date();

      // 처리 시간 초과 체크
      if (now.getTime() - processedAt.getTime() < PROCESSING_TIMEOUT) {
        return NextResponse.json(
          { error: "Queue is already being processed" },
          { status: 409 },
        );
      }
    }

    // 재시도 횟수 초과 체크
    if (currentQueue?.retryCount >= MAX_RETRY_COUNT) {
      return NextResponse.json(
        { error: "Max retry count exceeded" },
        { status: 400 },
      );
    }

    // 2. Queue 상태 업데이트
    const queueUpdate = await updateQueueStatus({
      _id: orderId,
      status: "processing",
      processedAt: new Date().toISOString(),
      retryCount: (currentQueue?.retryCount || 0) + 1,
    });

    // 3. 배송 정보 조회
    const trackingResult = await trackDelivery(carrierId, trackingNumber);
    if (!trackingResult.data?.track) {
      throw new Error("Failed to track delivery");
    }

    const statusCode = trackingResult.data.track.lastEvent.status.code;
    const orderStatus =
      DELIVERY_STATUS[statusCode as keyof typeof DELIVERY_STATUS] || "unknown";

    // 3. 주문 상태 업데이트
    await updateOrderStatus(
      orderId,
      orderStatus,
      trackingResult.data.track.events.edges,
    );

    // 5. 배송 완료나 실패 시 webhook 해제
    if (["done", "failed"].includes(orderStatus)) {
      try {
        await unRegisterWebhook(carrierId, trackingNumber);
        console.log(
          `Webhook unregistered for tracking number: ${trackingNumber}`,
        );
      } catch (unregisterError) {
        console.error("Failed to unregister webhook:", unregisterError);
        // webhook 해제 실패는 전체 프로세스를 실패로 처리하지 않음
      }
    }

    // 6. Queue 완료 처리
    await updateQueueStatus({
      _id: orderId,
      status: "completed",
      processedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // 7. 실패 시 재시도 가능하도록 상태 업데이트
    const currentRetryCount =
      (await client.fetch(
        `*[_type == "deliveryQueue" && order._ref == $orderId][0].retryCount`,
        { orderId },
      )) || 0;

    await updateQueueStatus({
      _id: orderId,
      status: "failed",
      processedAt: new Date().toISOString(),
      retryCount: currentRetryCount + 1,
    });

    return NextResponse.json(
      { error: "Failed to process delivery queue" },
      { status: 500 },
    );
  }
}
