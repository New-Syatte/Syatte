import { NextRequest, NextResponse } from "next/server";
import { confirmPayment } from "@/services/payment";
import { createOrderFromPayment } from "@/services/order";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // 1. 사용자 ID 확인
    const userId = req.headers.get("x-user-id");
    const userEmail = req.headers.get("x-user-email");
    const userName = req.headers.get("x-user-name");

    if (!userId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    // 2. 요청 데이터 검증
    const {
      paymentKey,
      orderId,
      amount,
      cartItems,
      shippingAddress,
      billingAddress,
    } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: "필수 결제 파라미터가 누락되었습니다." },
        { status: 400 },
      );
    }

    if (!cartItems || !shippingAddress || !billingAddress) {
      return NextResponse.json(
        { error: "필수 주문 정보가 누락되었습니다." },
        { status: 400 },
      );
    }

    // 3. 결제 검증
    const payment = await confirmPayment(paymentKey, orderId, amount);
    if (!payment) {
      return NextResponse.json(
        { error: "결제 검증에 실패했습니다." },
        { status: 400 },
      );
    }

    // 4. 주문 생성
    try {
      const order = await createOrderFromPayment({
        payment,
        orderId,
        userId,
        userEmail: userEmail || `${userId}@placeholder.com`,
        displayName: userName
          ? decodeURIComponent(userName)
          : `User-${userId.slice(-6)}`,
        cartItems,
        shippingAddress,
        billingAddress,
      });

      // 5. 체크아웃 데이터 쿠키 삭제
      const cookieStore = cookies();
      cookieStore.set("checkoutData", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return NextResponse.json({
        success: true,
        payment,
        order,
      });
    } catch (orderError: any) {
      // 주문이 이미 존재하는 경우 성공으로 처리
      if (orderError.statusCode === 409) {
        return NextResponse.json({
          success: true,
          payment,
          message: "이미 처리된 주문입니다.",
        });
      }
      throw orderError;
    }
  } catch (error: any) {
    console.error("Payment confirmation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "결제 처리 중 오류가 발생했습니다.",
        details: error.details || null,
      },
      { status: error.statusCode || 500 },
    );
  }
}
