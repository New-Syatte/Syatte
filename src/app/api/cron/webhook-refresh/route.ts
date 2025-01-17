import { NextRequest, NextResponse } from "next/server";
import { client } from "@/services/sanity";
import { registerWebhook } from "@/services/deliveryTracker";

const MAX_RETRY_COUNT = 3;
const WEBHOOK_EXPIRATION_HOURS = 48;

export async function GET(req: NextRequest) {
  try {
    // API 키 검증
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.DELIVERY_CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 배송중인 주문 조회 (moving, ready 상태)
    const orders = await client.fetch(`
      *[_type == "order" && (orderStatus == "moving" || orderStatus == "ready") && defined(shippingInfo.trackingNumber)] {
        _id,
        orderStatus,
        shippingInfo,
        _updatedAt
      }
    `);

    const results = {
      success: 0,
      failed: 0,
      skipped: 0,
    };

    for (const order of orders) {
      const { carrierId, trackingNumber } = order.shippingInfo;
      const lastUpdateTime = new Date(order._updatedAt);
      const hoursSinceUpdate =
        (Date.now() - lastUpdateTime.getTime()) / (1000 * 60 * 60);

      // webhook 갱신이 필요한 경우 (마지막 업데이트로부터 24시간 이상 지난 경우)
      if (hoursSinceUpdate >= 24) {
        try {
          await registerWebhook(
            carrierId,
            trackingNumber,
            WEBHOOK_EXPIRATION_HOURS,
          );
          results.success++;

          console.log("Webhook refreshed:", {
            orderId: order._id,
            carrierId,
            trackingNumber,
            orderStatus: order.orderStatus,
            hoursSinceUpdate,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          results.failed++;
          console.error("Failed to refresh webhook:", {
            orderId: order._id,
            carrierId,
            trackingNumber,
            orderStatus: order.orderStatus,
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        results.skipped++;
      }
    }

    return NextResponse.json({
      message: "Webhook refresh completed",
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Webhook refresh job failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        error: "Failed to process webhook refresh",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
