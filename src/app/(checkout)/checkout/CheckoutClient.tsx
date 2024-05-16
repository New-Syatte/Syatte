"use client";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FormEvent, useEffect } from "react";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import {
  selectCheckedCartItems,
  selectCheckedTotalAmount,
  selectCheckedTotalQuantity,
} from "@/redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "@/redux/slice/checkoutSlice";
import { useRouter } from "next/navigation";
import URLS from "@/constants/urls";
import CartInfoArticle from "@/app/(cart)/cart/CartInfoArticle";
import { useState } from "react";
import { Mobile } from "@/hooks/useMediaQuery";
import { saveCart } from "@/services/sanity/cart";
import dayjs from "dayjs";
import { Order } from "@/type/order";

export default function CheckoutClient() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const cartItems = useSelector(selectCheckedCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const cartTotalAmount = useSelector(selectCheckedTotalAmount);
  const cartTotalQuantity = useSelector(selectCheckedTotalQuantity);

  const clientkey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const isMobile = Mobile();

  const orderNameCount =
    cartItems && cartItems.length
      ? cartItems.length === 1
        ? cartItems[0].name
        : `${cartItems[0].name} 외  ${cartItems.length - 1}건`
      : "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tosspayment = clientkey ? await loadTossPayments(clientkey) : null;
    const orderId = Math.random().toString(36).slice(2);

    // Promise 방식에서 리다이렉트 URL로 처리하는 방식으로 변경
    // success 페이지에서 결제 승인 처리

    if (tosspayment) {
      tosspayment
        .requestPayment("카드", {
          amount: cartTotalAmount,
          orderId: orderId,
          orderName: orderNameCount,
          successUrl: `${URLS.rootURL}${URLS.CHECKOUT_SUCCESS}`,
          failUrl: `${URLS.rootURL}${URLS.CHECKOUT_FAIL}`,
        })
        .catch((error: any) => {
          if (error.code === "INVALID_ORDER_NAME") {
            toast.error("주문명이 유효하지 않습니다. 다시 시도해주세요.");
          } else if (error.code === "INVALID_ORDER_ID") {
            toast.error("주문번호가 유효하지 않습니다. 다시 시도해주세요.");
          }
        });
    }
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderData = {
      _id: orderId,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "payed",
      orderCount: cartTotalQuantity,
      cartItems: cartItems,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      shippingInfo: {
        trackingNumber: "",
        carrierId: "",
      },
    };
    await saveCart(orderData as Order)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    setIsScriptLoaded(true);
  }, []);

  if (isScriptLoaded)
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
                    onClick={() => {
                      history.back();
                    }}
                    style="text-xl font-bold"
                    styleType="secondary"
                  >
                    이전으로
                  </Button>
                </div>
                <div className="w-1/2 h-14">
                  <Button type="submit" style="text-xl font-bold">
                    결제하기
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  else return <></>;
}
