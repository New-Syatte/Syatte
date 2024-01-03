import Heading from "@/components/heading/Heading";
import styles from "./CheckoutSuccess.module.scss";
import priceFormat from "@/utils/priceFormat";
import { formatTime } from "@/utils/dayjs";
import Button from "@/components/button/Button";
import NextLink from "@/components/NextLink/NextLink";
import RouteComplete from "@/utils/RouteComplete";

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
    console.log(res);
    return res.json();
  });

  return (
    <RouteComplete>
      <section className={styles.success}>
        <Heading title={"결재 성공 "} />
        <ul className={styles.list}>
          <li>
            <b>결재 상품:</b>
            {payment?.orderName}
          </li>
          <li>
            <b>주문 번호:</b>
            {payment?.orderId}
          </li>
          <li>
            <b>결재 수단:</b>
            {payment?.method}
          </li>
          {payment.card && (
            <li>
              <b>카드 번호:</b>
              {payment.card?.number}
            </li>
          )}
          {payment.totalAmount && (
            <li>
              <b>결재 금액:</b>
              {priceFormat(payment.totalAmount)}
            </li>
          )}
          {payment.createdAt && (
            <li>
              <b>결재승인날짜:</b>
              {formatTime(payment.createdAt)}
            </li>
          )}
        </ul>
        <Button style="py-3 px-12">
          <NextLink href="/order/order-history">주문 상태 보기</NextLink>
        </Button>
      </section>
    </RouteComplete>
  );
}
