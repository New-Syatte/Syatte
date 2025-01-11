"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import URLS from "@/constants/urls";
import { revalidatePath } from "next/cache";
import {
  HandleCheckoutErrorAction,
  SetCheckoutDataAction,
  DeleteCheckoutDataAction,
  CheckoutData,
} from "@/type/action";

export const handleCheckoutError: HandleCheckoutErrorAction = async (
  message,
  orderId,
) => {
  redirect(
    `${URLS.CHECKOUT_FAIL}?message=${encodeURIComponent(
      message,
    )}&orderId=${orderId}`,
  );
};

export const setCheckoutData: SetCheckoutDataAction = async data => {
  "use server";

  try {
    // 데이터 유효성 검사
    const checkoutData = JSON.parse(data) as CheckoutData;
    if (
      !checkoutData.cartItems?.length ||
      !checkoutData.shippingAddress ||
      !checkoutData.billingAddress
    ) {
      throw new Error("체크아웃 데이터가 유효하지 않습니다.");
    }

    const cookieStore = await cookies();
    cookieStore.set("checkoutData", data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    revalidatePath("/checkout");
    revalidatePath("/checkout-success");
  } catch (error) {
    console.error("Error setting checkout data:", error);
    throw error;
  }
};

export const deleteCheckoutData: DeleteCheckoutDataAction = async () => {
  "use server";

  try {
    const cookieStore = await cookies();
    cookieStore.set("checkoutData", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // 즉시 만료
    });

    revalidatePath("/checkout");
    revalidatePath("/checkout-success");
  } catch (error) {
    console.error("Error deleting checkout data:", error);
    throw error;
  }
};
