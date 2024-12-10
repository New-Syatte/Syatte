"use server";

import { getAccessToken } from "@/services/deliveryTracker";
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

// isUnauthenticated가 true인 경우 새로운 토큰을 가져오고,
// false인 경우 쿠키에 저장된 토큰을 반환하는 함수
async function getDeliveryToken(isUnauthenticated: boolean) {
  const cookieStore = cookies();
  const deliveryAccessToken = cookieStore.get("deliveryAccessToken");

  // 쿠키에 deliveryAccessToken이 있는 경우
  if (deliveryAccessToken !== undefined) {
    // isUnauthenticated가 true인 경우
    if (isUnauthenticated) {
      const newAccessToken = await getAccessToken();
      cookieStore.set("deliveryAccessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600,
      });
      // 새로운 토큰을 반환
      return newAccessToken.value;
    } else {
      // isUnauthenticated가 false인 경우 쿠키에 저장된 토큰을 반환
      return deliveryAccessToken.value;
    }
  } else {
    // 쿠키에 deliveryAccessToken이 없는 경우
    // 새로운 액세스 토큰을 가져옴
    const newAccessToken = await getAccessToken();
    // 새로운 토큰을 쿠키에 저장
    cookieStore.set("deliveryAccessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600,
    });
    // 새로운 토큰을 반환
    return newAccessToken.value;
  }
}

// 배송 추적 함수를 서버 액션으로 이동
export async function serverTrackDelivery(
  carrierId: string,
  trackingNumber: string,
) {
  try {
    // 먼저 기존 토큰으로 시도
    const accessToken = await getDeliveryToken(false);
    const deliveryData = await trackDelivery(
      carrierId,
      trackingNumber,
      accessToken,
    );

    // 에러가 있는지 확인
    if (deliveryData.errors) {
      const unauthenticatedError = deliveryData.errors.find(
        (error: any) =>
          error.extensions && error.extensions.code === "UNAUTHENTICATED",
      );

      // 인증 에러인 경우 토큰 재발급 후 재시도
      if (unauthenticatedError) {
        const newAccessToken = await getDeliveryToken(true);
        const newDeliveryData = await trackDelivery(
          carrierId,
          trackingNumber,
          newAccessToken,
        );
        return newDeliveryData;
      }

      // 다른 에러의 경우
      throw new Error(deliveryData.errors[0].message);
    }

    return deliveryData;
  } catch (error: any) {
    // 서버 사이드에서 에러 로깅
    console.error("배송 조회 중 오류가 발생했습니다:", error);

    if (error.message === "UNAUTHENTICATED") {
      throw new Error("인증에 실패했습니다. 다시 시도해주세요.");
    }

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

export default getDeliveryToken;
