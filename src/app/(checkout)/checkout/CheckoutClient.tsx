"use client";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FormEvent } from "react";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import {
  REMOVE_CHECKED_ITEMS_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
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

export default function CheckoutClient() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const clientkey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const secretkey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

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

  return (
    <section>
      <div className="w-[80%] mx-auto my-12">
        <Heading title={"주문하기"} fontSize="6xl" />
        <form onSubmit={handleSubmit}>
          <div>
            <CheckoutForm />
          </div>
          <div className={"flex justify-center items-center"}>
            <Button type={"submit"} style="py-3 px-12">
              결재하기
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
