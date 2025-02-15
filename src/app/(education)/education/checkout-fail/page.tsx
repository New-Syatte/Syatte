import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutFailPage() {
  return (
    <div className="max-w-[600px] mx-auto py-20 px-4 text-center">
      <div className="flex justify-center mb-6">
        <XCircle className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold mb-4">결제에 실패했습니다</h1>
      <p className="text-gray-600 mb-8">
        결제 처리 중 문제가 발생했습니다. 다시 시도하시거나 고객센터로 문의해
        주세요.
      </p>
      <div className="space-y-4">
        <Link
          href="/education"
          className="block w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          교육 목록으로 돌아가기
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
