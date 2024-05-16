"use client";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FormEvent, useEffect } from "react";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import {
  REMOVE_CHECKED_ITEMS_FROM_CART,
  selectCheckedCartItems,
  selectCheckedTotalAmount,
  selectCheckedTotalQuantity,
} from "@/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "@/redux/slice/checkoutSlice";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { saveCart } from "@/services/sanity/cart";
import { Order } from "@/type/order";
import URLS from "@/constants/urls";
import CartInfoArticle from "@/app/(cart)/cart/CartInfoArticle";
import { useState } from "react";
import { Mobile } from "@/hooks/useMediaQuery";

export default function CheckoutClient() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCheckedCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const cartTotalAmount = useSelector(selectCheckedTotalAmount);
  const cartTotalQuantity = useSelector(selectCheckedTotalQuantity);

  const clientkey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const secretkey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
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

    if (tosspayment) {
      tosspayment
        .requestPayment("카드", {
          amount: cartTotalAmount,
          orderId: Math.random().toString(36).slice(2),
          orderName: orderNameCount,
        })
        .then(async function (data) {
          const { orderId, paymentKey, amount } = data;
          const url = "https://api.tosspayments.com/v1/payments/confirm";
          const basicToken = Buffer.from(`${secretkey}:`, "utf-8").toString(
            "base64",
          );
          await fetch(url, {
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

          const today = new Date();
          const date = today.toDateString();
          const time = today.toLocaleTimeString();

          const orderData = {
            _id: orderId,
            userEmail,
            orderDate: date,
            orderTime: time,
            orderAmount: amount,
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
          await saveCart(orderData as Order);
          // db에 저장
          dispatch(REMOVE_CHECKED_ITEMS_FROM_CART());
          router.push(`${URLS.CHECKOUT_SUCCESS}?orderId=${orderId}`);
        })
        .catch(error => {
          if (error.code === "USER_CANCEL") {
            toast.error("결재창이 닫아졌습니다.");
          } else {
            toast.error("결재에 실패했습니다. 잠시 후 다시 시도해주세요.");
            console.error("error", error);
          }
        });
    }
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
