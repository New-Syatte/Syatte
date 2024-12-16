import Image from "next/image";
import Link from "next/link";
import ErrorIcon from "@/assets/cart/errorIcon.svg";

interface Props {
  searchParams: {
    message: string;
    orderId: string;
  };
}

export default async function CheckoutFailPage({ searchParams }: Props) {
  const listStyle = "flex justify-between text-lg mb-4";
  const subTitle = "text-[22px] font-bold";

  // searchParams 값 추출
  const { message, orderId } = await Promise.resolve(searchParams);

  return (
    <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full max-w-[600px] p-8 bg-white rounded-lg shadow-lg">
          <Image
            src={ErrorIcon}
            alt="에러 아이콘"
            width={80}
            height={80}
            className="mb-8"
          />
          <h1 className="text-3xl font-bold mb-8">결제 실패</h1>
          <div className="w-full mb-8">
            <h2 className={subTitle}>실패 정보</h2>
            <ul className="mt-4">
              <li className={listStyle}>
                <span>주문 번호</span>
                <span>{orderId}</span>
              </li>
              <li className={listStyle}>
                <span>실패 사유</span>
                <span className="text-right">{message}</span>
              </li>
            </ul>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              홈으로
            </Link>
            <Link
              href="/cart"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors"
            >
              장바구니로
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
