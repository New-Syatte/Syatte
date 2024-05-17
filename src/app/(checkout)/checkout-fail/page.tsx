import Image from "next/image";
import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import Link from "next/link";
import URLS from "@/constants/urls";
import ErrorIcon from "@/assets/cart/errorIcon.svg";

interface Props {
  searchParams: {
    message: string;
    orderId: string;
  };
}

const page = ({ searchParams }: Props) => {
  const { message, orderId } = searchParams;

  const listStyle = "flex justify-between text-lg mb-4";
  const subTitle = "text-[22px] font-bold";
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 pt-24">
      <Image
        src={ErrorIcon}
        alt="successIcon"
        width={80}
        height={80}
        className="my-10"
      />
      <Heading title={"결제 실패"} center fontSize="6xl sm:text-3xl" />
      <ul className="p-8 border border-lightGray w-2/5 rounded-md mt-12 sm:w-[90%]">
        <li className={listStyle}>
          <b className={subTitle}>에러</b>
          {message}
        </li>
        <li className={listStyle}>
          <b className={subTitle}>주문 번호</b>
          {orderId}
        </li>
      </ul>
      <div className="flex w-1/3 gap-4 mt-10 sm:w-[90%]">
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
    </div>
  );
};

export default page;
