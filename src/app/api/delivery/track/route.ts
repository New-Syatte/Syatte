// src/app/api/delivery/track/route.ts
import { NextRequest, NextResponse } from "next/server";
import { trackDelivery } from "@/services/deliveryTracker";

export async function POST(req: NextRequest) {
  try {
    const { carrierId, trackingNumber } = await req.json();
    const result = await trackDelivery(carrierId, trackingNumber);
    return NextResponse.json(result);
  } catch (error) {
    console.error("배송 조회 중 오류:", error);
    return NextResponse.json(
      { error: "배송 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
