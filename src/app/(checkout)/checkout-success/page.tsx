import Loader from "@/components/loader/Loader";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

type Props = {
  searchParams: {
    orderId: string;
    paymentKey: string;
    amount: string;
    paymentType: string;
  };
};

export default async function CheckoutSuccess({ searchParams }: Props) {
  const secretkey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
  const { orderId, paymentKey, amount } = searchParams;
  const basicToken = Buffer.from(`${secretkey}:`, "utf-8").toString("base64");

  const confirmUrl = "https://api.tosspayments.com/v1/payments/confirm";
  const payment = await fetch(confirmUrl, {
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
  }).then(res => {
    return res.json();
  });

  return (
    <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
      {payment && <CheckoutSuccessClient payment={payment} />}
      {!payment && <Loader />}
    </section>
  );
}
