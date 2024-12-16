import { NextRequest } from "next/server";
import { client } from "@/services/sanity/sanity";
import { registerWebhook } from "@/services/deliveryTracker";

// 개발 환경에서만 사용 가능한 엔드포인트
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "This endpoint is only available in development" },
      { status: 403 },
    );
  }

  try {
    // 배송중인 주문 조회 (moving, ready 상태)
    const orders = await client.fetch(`
      *[_type == "order" && (orderStatus == "moving" || orderStatus == "ready") && defined(shippingInfo.trackingNumber)] {
        _id,
        shippingInfo
      }
    `);

    const results = await Promise.allSettled(
      orders.map(async (order: any) => {
        try {
          const { carrierId, trackingNumber } = order.shippingInfo;
          if (!carrierId || !trackingNumber) return null;

          // webhook 갱신
          await registerWebhook(carrierId, trackingNumber);
          return { orderId: order._id, status: "success" };
        } catch (error) {
          console.error(
            `Failed to refresh webhook for order ${order._id}:`,
            error,
          );
          return { orderId: order._id, status: "failed", error };
        }
      }),
    );

    const succeeded = results.filter(
      r => r.status === "fulfilled" && r.value?.status === "success",
    ).length;
    const failed = results.filter(
      r => r.status === "rejected" || r.value?.status === "failed",
    ).length;

    return Response.json({
      success: true,
      summary: {
        total: orders.length,
        succeeded,
        failed,
      },
    });
  } catch (error) {
    console.error("Webhook refresh error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
