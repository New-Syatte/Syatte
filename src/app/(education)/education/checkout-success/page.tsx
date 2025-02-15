import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-[600px] mx-auto py-20 px-4 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다</h1>
      <p className="text-gray-600 mb-8">
        교육 신청이 성공적으로 완료되었습니다. 입력하신 이메일로 예약 확인
        메일이 발송될 예정입니다.
      </p>
      <div className="space-y-4">
        <Link
          href="/education"
          className="block w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          교육 목록으로 돌아가기
        </Link>
        <Link
          href="/"
          className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
