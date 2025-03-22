import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createOrderFromPayment } from "@/services/sanity/orders";
import { confirmPayment } from "@/services/payment";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  
  // URL 파라미터에서 직접 사용자 정보 가져오기
  const userId = searchParams.get("userId") || "unknown";
  const userEmail = searchParams.get("userEmail") || "";
  
  // userId 또는 이메일 중 하나는 반드시 필요
  if (!orderId || !paymentKey || !amount || (!userId && !userEmail)) {
    return NextResponse.redirect(
      new URL(
        `/checkout-fail?message=${encodeURIComponent(
          "결제 정보가 올바르지 않습니다. 사용자 식별 정보가 필요합니다.",
        )}`,
        req.url,
      ),
    );
  }

  try {
    // 체크아웃 데이터 가져오기
    const cookieStore = await cookies();
    const checkoutDataCookie = cookieStore.get("checkoutData");

    if (!checkoutDataCookie?.value) {
      return NextResponse.redirect(
        new URL(
          `/checkout-fail?message=${encodeURIComponent(
            "체크아웃 데이터를 찾을 수 없습니다.",
          )}`,
          req.url,
        ),
      );
    }

    const checkoutData = JSON.parse(checkoutDataCookie.value);

    // 결제 승인 요청
    const payment = await confirmPayment(paymentKey, orderId, amount);

    if (!payment) {
      return NextResponse.redirect(
        new URL(
          `/checkout-fail?message=${encodeURIComponent(
            "결제 승인에 실패했습니다.",
          )}`,
          req.url,
        ),
      );
    }

    // 체크아웃 데이터에서 사용자 이름 가져오기
    const userName = checkoutData.billingAddress?.name || "";

    // 주문 생성 - userId와 이메일 모두 전달
    try {
      const order = await createOrderFromPayment({
        payment,
        orderId,
        userId,
        userEmail,
        displayName: userName,
        cartItems: checkoutData.cartItems || [],
        shippingAddress: checkoutData.shippingAddress || {},
        billingAddress: checkoutData.billingAddress || {},
      });

      if (!order) {
        throw new Error("주문 생성 결과가 없습니다");
      }

      // 체크아웃 데이터 쿠키 삭제
      cookieStore.delete("checkoutData");

      // 성공 페이지로 리다이렉트
      return NextResponse.redirect(
        new URL(
          `/checkout-success?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
          req.url,
        ),
      );
    } catch (error: any) {
      console.error("Order creation error:", {
        error: error.message,
        stack: error.stack,
        orderId,
        userId,
        userEmail,
      });
      throw error;
    }
  } catch (error: any) {
    console.error("Payment confirmation error:", error);
    return NextResponse.redirect(
      new URL(
        `/checkout-fail?message=${encodeURIComponent(
          error.message || "결제 처리 중 오류가 발생했습니다.",
        )}`,
        req.url,
      ),
    );
  }
}
