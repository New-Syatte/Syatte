"use server";
import { getAccessToken } from "@/services/deliveryTracker";
import { cookies } from "next/headers";

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
    cookieStore.set("deliveryAccessToken", newAccessToken, { httpOnly: true });
    // 새로운 토큰을 반환
    return newAccessToken.value;
  }
}

export default getDeliveryToken;
