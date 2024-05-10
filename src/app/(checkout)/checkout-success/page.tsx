import Heading from "@/components/heading/Heading";
import priceFormat from "@/utils/priceFormat";
import { formatTime } from "@/utils/dayjs";
import Button from "@/components/button/Button";
import Link from "next/link";
import URLS from "@/constants/urls";
import Image from "next/image";
import SuccessCheck from "@/assets/cart/successCheck.svg";

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

  const listStyle = "flex justify-between text-lg mb-4";
  const subTitle = "text-[22px] font-bold";
  return (
    <section className="w-[80%] mx-auto my-24 min-h-[80vh] flex flex-col items-center justify-center">
      <Image
        src={SuccessCheck}
        alt="successIcon"
        width={80}
        height={80}
        className="my-10"
      />
      <Heading title={"결제 완료"} fontSize="6xl" />
      <ul className="p-8 border border-lightGray w-2/5 rounded-md mt-12">
        <li className={listStyle}>
          <b className={subTitle}>결제 상품</b>
          {payment?.orderName}
        </li>
        <li className={listStyle}>
          <b className={subTitle}>주문 번호</b>
          {payment?.orderId}
        </li>
        <li className={listStyle + " pb-2"}>
          <b className={subTitle}>결제 수단</b>
          {payment?.method}
        </li>
        {/* {payment.card && (
          <li className={listStyle}>
            <b className={subTitle}>카드 번호</b>
            {payment.card?.number}
          </li>
        )}
        {payment.approvedAt && (
          <li className={listStyle}>
            <b className={subTitle}>결제승인날짜</b>
            {formatTime(payment.approvedAt)}
          </li>
        )} */}
        {payment.totalAmount && (
          <li className="flex justify-between mt-4 border-t border-lightGray pt-6">
            <b className={subTitle}>결제 금액</b>
            <b className={subTitle}>
              {priceFormat(payment.totalAmount) + "원"}
            </b>
          </li>
        )}
      </ul>
      <div className="flex w-1/3 gap-4 mt-10">
        <div className="w-1/2 h-14">
          <Button styleType="secondary" style="text-xl font-bold">
            <Link href={URLS.rootURL}>홈으로</Link>
          </Button>
        </div>
        <div className="w-1/2 h-14">
          <Button styleType="primary" style="text-xl font-bold">
            <Link href={URLS.ORDER_HISTORY}>주문 내역 확인</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
