import CheckoutSuccessClient from "./CheckoutSuccessClient";
import { cookies } from "next/headers";
import { handleCheckoutError } from "@/app/actions";
import { headers } from "next/headers";

interface SearchParams {
  orderId: string;
  paymentKey: string;
  amount: string;
}

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  try {
    // 쿠키에서 체크아웃 데이터 가져오기
    const cookieStore = cookies();
    const checkoutDataCookie = cookieStore.get("checkoutData");
    const sessionToken = cookieStore.get("next-auth.session-token");

    if (!checkoutDataCookie) {
      console.error("Checkout data not found in cookies");
      handleCheckoutError(
        "결제 정보를 찾을 수 없습니다.",
        searchParams.orderId,
      );
      return null;
    }

    const checkoutData = JSON.parse(checkoutDataCookie.value);

    // 현재 호스트 가져오기
    const headersList = headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    try {
      // API route를 통해 결제 검증 및 주문 생성
      const response = await fetch(
        `${protocol}://${host}/api/payment/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `next-auth.session-token=${sessionToken?.value}`,
          },
          body: JSON.stringify({
            ...searchParams,
            ...checkoutData,
          }),
          cache: "no-store",
          credentials: "same-origin",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Payment confirmation failed:", error);
        handleCheckoutError(
          error.error || "결제 처리 중 오류가 발생했습니다.",
          searchParams.orderId,
        );
        return null;
      }

      const { payment, order } = await response.json();

      return (
        <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
          <CheckoutSuccessClient payment={payment} order={order} />
        </section>
      );
    } catch (error: any) {
      console.error("API request failed:", error);
      handleCheckoutError(
        "결제 처리 중 오류가 발생했습니다.",
        searchParams.orderId,
      );
      return null;
    }
  } catch (error: any) {
    console.error("Checkout success page error:", error);
    handleCheckoutError(
      error.message || "알 수 없는 오류가 발생했습니다.",
      searchParams.orderId,
    );
    return null;
  }
}
