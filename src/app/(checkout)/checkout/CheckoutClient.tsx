"use client";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FormEvent, useEffect } from "react";
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

export default function CheckoutClient() {
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clientkey) {
      toast.error("결제 설정이 올바르지 않습니다.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("장바구니가 비어있습니다.");
      return;
    }

    if (!shippingAddress || !billingAddress) {
      toast.error("배송지 정보가 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);

      // 체크아웃 데이터 저장
      await setCheckoutData(
        JSON.stringify({
          cartItems,
          shippingAddress,
          billingAddress,
        }),
      );

      // 결제 요청
      await requestPayment(clientkey, cartTotalAmount, orderNameCount);
    } catch (error) {
      console.error("Payment request error:", error);
      toast.error("결제 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                >
                  이전으로
                </Button>
              </div>
              <div className="w-1/2 h-14">
                <Button
                  type="submit"
                  style="text-xl font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "처리중..." : "결제하기"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
