import { loadTossPayments } from "@tosspayments/payment-sdk";
import { toast } from "react-toastify";
import URLS from "@/constants/urls";

export const requestPayment = async (
  clientKey: string,
  amount: number,
  orderName: string,
) => {
  const orderId = Math.random().toString(36).slice(2);
  const tosspayment = clientKey ? await loadTossPayments(clientKey) : null;

  if (!tosspayment) {
    toast.error("결제 모듈을 불러오는데 실패했습니다.");
    return null;
  }

  try {
    await tosspayment.requestPayment("카드", {
      amount,
      orderId,
      orderName,
      successUrl: `${URLS.rootURL}${URLS.CHECKOUT_SUCCESS}`,
      failUrl: `${URLS.rootURL}${URLS.CHECKOUT_FAIL}`,
    });
    return orderId;
  } catch (error: any) {
    if (error.code === "INVALID_ORDER_NAME") {
      toast.error("주문명이 유효하지 않습니다. 다시 시도해주세요.");
    } else if (error.code === "INVALID_ORDER_ID") {
      toast.error("주문번호가 유효하지 않습니다. 다시 시도해주세요.");
    } else {
      toast.error("결제 요청 중 오류가 발생했습니다.");
    }
    return null;
  }
};

export const confirmPayment = async (
  paymentKey: string,
  orderId: string,
  amount: string,
) => {
  const secretkey = process.env.TOSS_SECRET_KEY;
  const basicToken = Buffer.from(`${secretkey}:`, "utf-8").toString("base64");
  const confirmUrl = "https://api.tosspayments.com/v1/payments/confirm";

  try {
    const response = await fetch(confirmUrl, {
      method: "post",
      body: JSON.stringify({
        orderId,
        paymentKey,
        amount,
      }),
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
    });

    const payment = await response.json();
    return payment;
  } catch (error) {
    console.error("결제 승인 중 오류 발생:", error);
    return null;
  }
};
