import Image from "next/image";
import Link from "next/link";
import ErrorIcon from "@/assets/cart/errorIcon.svg";

type SearchParams = Promise<{
  message?: string;
  orderId?: string;
}>;

export default async function CheckoutFailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const { message, orderId } = resolvedParams;

  return (
    <div className="max-w-[600px] mx-auto py-20 px-4 text-center">
      <div className="flex justify-center mb-6">
        <Image src={ErrorIcon} alt="에러" width={64} height={64} />
      </div>
      <h1 className="text-2xl font-bold mb-4">결제에 실패했습니다</h1>
      <p className="text-gray-600 mb-8">
        {message || "결제 처리 중 문제가 발생했습니다."}
        <br />
        다시 시도하시거나 고객센터로 문의해 주세요.
      </p>
      <div className="space-y-4">
        <Link
          href="/"
          className="block w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          홈으로 가기
        </Link>
        <button
          onClick={() => window.history.back()}
          className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
