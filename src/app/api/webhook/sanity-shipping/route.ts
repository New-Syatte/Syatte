import { NextRequest, NextResponse } from "next/server";
import { registerWebhook } from "@/services/deliveryTracker";

// carrierId, trackingNumber가 sanity에서 입력되면 호출되는 웹훅
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Secret 검증
    const webhookSecret = req.headers.get("x-sanity-webhook-secret");
    if (webhookSecret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Webhook 데이터 파싱
    const { after } = await req.json();
    const { carrierId, trackingNumber } = after.shippingInfo || {};

    if (!carrierId || !trackingNumber) {
      return NextResponse.json({
        message: "No shipping information available",
      });
    }

    try {
      await registerWebhook(carrierId, trackingNumber);
      const duration = Date.now() - startTime;

      // 성능 메트릭 로깅
      console.log("Webhook registration metrics:", {
        operation: "register_webhook",
        carrierId,
        trackingNumber,
        orderId: after._id,
        duration,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Delivery tracking webhook registered successfully",
      });
    } catch (error) {
      console.error("Webhook registration failed:", {
        carrierId,
        trackingNumber,
        orderId: after._id,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          error: "Failed to register webhook",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Sanity webhook processing error:", {
      error,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
