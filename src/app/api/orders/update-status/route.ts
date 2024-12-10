import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/services/sanity/orders";
import { client } from "@/services/sanity/sanity";

export async function POST(req: NextRequest) {
  try {
    const { orderId, status, events } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId and status are required" },
        { status: 400 },
      );
    }

    // Sanity 클라이언트가 제대로 구성되어 있는지 확인
    if (!client.config().token) {
      console.error("Sanity token is missing");
      return NextResponse.json(
        { error: "Sanity configuration error" },
        { status: 500 },
      );
    }

    try {
      await updateOrderStatus(orderId, status, events);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.error("Sanity update error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to update order status" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Order status update error:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}
