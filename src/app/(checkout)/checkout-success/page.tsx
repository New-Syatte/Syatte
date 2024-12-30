import { redirect } from "next/navigation";
import CheckoutSuccessClient from "./CheckoutSuccessClient";
import { getOrder } from "@/services/sanity/orders";
import { PaymentResponse } from "@/type/tossPayments";
import { Suspense } from "react";

function PaymentProcessing() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">결제 처리 중입니다</h2>
        <p className="text-gray-600">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}

type SearchParams = Promise<{
  orderId: string;
  paymentKey: string;
  amount: string;
}>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await Promise.resolve(searchParams);
  const orderId = params.orderId;

  if (!orderId) {
    console.error("Order ID is missing from search params");
    const message = encodeURIComponent("주문 정보를 찾을 수 없습니다.");
    redirect(`/checkout-fail?message=${message}`);
  }

  try {
    const order = await getOrder(orderId);

    if (!order) {
      console.error("Order not found:", orderId);
      const message = encodeURIComponent("주문 정보를 찾을 수 없습니다.");
      redirect(`/checkout-fail?message=${message}`);
    }

    // 결제 정보 생성
    const payment: PaymentResponse = {
      version: "2022-11-16",
      paymentKey: params.paymentKey,
      type: "NORMAL",
      orderId,
      orderName: order.cartItems[0]?.name || "주문",
      mId: "tvivarepublica",
      currency: "KRW",
      method: "간편결제",
      totalAmount: order.orderAmount,
      balanceAmount: order.orderAmount,
      status: "DONE",
      requestedAt: order.createdAt,
      approvedAt: order.createdAt,
      useEscrow: false,
      receipt: { url: "" },
      checkout: { url: "" },
    };

    return (
      <Suspense fallback={<PaymentProcessing />}>
        <CheckoutSuccessClient order={order} payment={payment} />
      </Suspense>
    );
  } catch (error: any) {
    console.error("Checkout success page error details:", {
      error: error.message,
      stack: error.stack,
      orderId,
    });
    const message = encodeURIComponent(
      "주문 정보를 불러오는데 실패했습니다. 주문 내역에서 확인해주세요.",
    );
    redirect(`/checkout-fail?message=${message}&orderId=${orderId}`);
  }
}
