import Heading from "@/components/heading/Heading";
import priceFormat from "@/utils/priceFormat";
import { formatTime } from "@/utils/dayjs";
import Button from "@/components/button/Button";
import Link from "next/link";
import URLS from "@/constants/urls";

type Props = {
  searchParams: {
    orderId: string;
  };
};

export default async function CheckoutSuccess({ searchParams }: Props) {
  const secretkey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const basicToken = Buffer.from(`${secretkey}:`, "utf-8").toString("base64");

  const payment = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then(res => {
    return res.json();
  });

  const listStyle = "text-xl mb-4";
  return (
    <>
      <section className="w-[1020px] mx-auto mt-[3rem]">
        <Heading title={"결재 성공 "} />
        <ul className="p-4">
          <li className={listStyle}>
            <b>결재 상품:</b>
            {payment?.orderName}
          </li>
          <li className={listStyle}>
            <b>주문 번호:</b>
            {payment?.orderId}
          </li>
          <li className={listStyle}>
            <b>결재 수단:</b>
            {payment?.method}
          </li>
          {payment.card && (
            <li className={listStyle}>
              <b>카드 번호:</b>
              {payment.card?.number}
            </li>
          )}
          {payment.totalAmount && (
            <li className={listStyle}>
              <b>결재 금액:</b>
              {priceFormat(payment.totalAmount)}
            </li>
          )}
          {payment.createdAt && (
            <li className={listStyle}>
              <b>결재승인날짜:</b>
              {formatTime(payment.createdAt)}
            </li>
          )}
        </ul>
        <Button style="py-3 px-12">
          <Link href={URLS.ORDER_HISTORY}>주문 상태 보기</Link>
        </Button>
      </section>
    </>
  );
}
