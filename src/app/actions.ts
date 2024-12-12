"use server";

import { cookies } from "next/headers";
import { trackDelivery } from "@/services/deliveryTracker";
import { redirect } from "next/navigation";
import URLS from "@/constants/urls";

export async function handleCheckoutError(message: string, orderId: string) {
  redirect(
    `${URLS.CHECKOUT_FAIL}?message=${encodeURIComponent(
      message,
    )}&orderId=${orderId}`,
  );
}

// 배송 추적 함수를 서버 액션으로 이동
export async function serverTrackDelivery(
  carrierId: string,
  trackingNumber: string,
) {
  try {
    const deliveryData = await trackDelivery(carrierId, trackingNumber);

    // 에러가 있는지 확인
    if (deliveryData.errors) {
      throw new Error(deliveryData.errors[0].message);
    }

    return deliveryData;
  } catch (error: any) {
    // 서버 사이드에서 에러 로깅
    console.error("배송 조회 중 오류가 발생했습니다:", error);

    // 클라이언트에 표시할 적절한 에러 메시지 반환
    throw new Error("배송 조회 중 오류가 발생했습니다.");
  }
}

export async function setCheckoutData(data: string) {
  try {
    const cookieStore = cookies();
    cookieStore.set("checkoutData", data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });
  } catch (error) {
    console.error("Error setting checkout data:", error);
    throw error;
  }
}

export async function deleteCheckoutData() {
  try {
    const cookieStore = cookies();
    cookieStore.set("checkoutData", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // 즉시 만료
    });
  } catch (error) {
    console.error("Error deleting checkout data:", error);
    throw error;
  }
}
