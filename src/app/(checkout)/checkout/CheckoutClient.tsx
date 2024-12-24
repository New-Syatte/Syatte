"use client";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FormEvent, useEffect, useTransition } from "react";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import {
  selectCheckedCartItems,
  selectCheckedTotalAmount,
} from "@/redux/slice/cartSlice";
import { useSelector } from "react-redux";
import CartInfoArticle from "@/app/(cart)/cart/CartInfoArticle";
import { useState } from "react";
import { Mobile } from "@/hooks/useMediaQuery";
import { requestPayment } from "@/services/payment";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "@/redux/slice/checkoutSlice";
import { setCheckoutData } from "@/app/actions";
import { toast } from "react-toastify";
import { CheckoutData } from "@/type/action";

export default function CheckoutClient() {
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const cartItems = useSelector(selectCheckedCartItems);
  const cartTotalAmount = useSelector(selectCheckedTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const clientkey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const isMobile = Mobile();

  const orderNameCount =
    cartItems && cartItems.length
      ? cartItems.length === 1
        ? cartItems[0].name
        : `${cartItems[0].name} 외 ${cartItems.length - 1}건`
      : "";

  const validateCheckoutData = (): boolean => {
    if (!clientkey) {
      toast.error("결제 설정이 올바르지 않습니다.");
      return false;
    }

    if (cartItems.length === 0) {
      toast.error("장바구니가 비어있습니다.");
      return false;
    }

    if (!shippingAddress || !billingAddress) {
      toast.error("배송지 정보가 필요합니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateCheckoutData()) return;
    const cartItemsForCheckout = cartItems.map(item => {
      const { isChecked, ...others } = item;
      return others;
    });
    const checkoutData: CheckoutData = {
      cartItems: cartItemsForCheckout,
      shippingAddress,
      billingAddress,
    };

    startTransition(async () => {
      try {
        // 체크아웃 데이터 저장
        await setCheckoutData(JSON.stringify(checkoutData));

        // 결제 요청
        await requestPayment(clientkey!, cartTotalAmount, orderNameCount);
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "체크아웃 처리 중 오류가 발생했습니다.",
        );
      }
    });
  };

  useEffect(() => {
    setIsScriptLoaded(true);
  }, []);

  if (!isScriptLoaded) return null;

  return (
    <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
      <div className="w-full flex flex-col items-start justify-start py-16 pt-24">
        <Heading
          title={"상품결제"}
          center={isMobile}
          fontSize="6xl sm:text-3xl"
        />
        <form
          onSubmit={handleSubmit}
          className="flex w-full mt-10 gap-20 sm:flex-col sm:justify-center sm:items-center"
        >
          <div className="w-2/3 sm:w-[90%]">
            <CheckoutForm />
          </div>
          <div className="flex flex-col justify-start items-start w-1/4 gap-5 sm:w-[90%]">
            <CartInfoArticle />
            <div className="flex w-full gap-2">
              <div className="w-1/2 h-14">
                <Button
                  onClick={() => history.back()}
                  style="text-xl font-bold"
                  styleType="secondary"
                  disabled={isPending}
                >
                  이전으로
                </Button>
              </div>
              <div className="w-1/2 h-14">
                <Button
                  type="submit"
                  style="text-xl font-bold"
                  disabled={isPending}
                >
                  {isPending ? "처리중..." : "결제하기"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
