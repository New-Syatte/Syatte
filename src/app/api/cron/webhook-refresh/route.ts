import { NextRequest, NextResponse } from "next/server";
import { client } from "@/services/sanity/sanity";
import { registerWebhook } from "@/services/deliveryTracker";

// Vercel Cron Job에서 24시간마다 호출
export const dynamic = "force-dynamic";

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

    return NextResponse.json({
      success: true,
      summary: {
        total: orders.length,
        succeeded,
        failed,
      },
    });
  } catch (error) {
    console.error("Webhook refresh cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
