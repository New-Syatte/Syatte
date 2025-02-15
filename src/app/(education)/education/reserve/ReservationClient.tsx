"use client";

import { loadTossPayments } from "@tosspayments/payment-sdk";
import ReservationForm from "./ReservationForm";
import EducationInfoArticle from "./EducationInfoArticle";
import Button from "@/components/button/Button";

interface Course {
  _id: string;
  name: string;
  fee: number;
  startDate: string;
  endDate: string;
  schedule: string;
  location: string;
}

interface ReservationClientProps {
  course: Course;
}

export default function ReservationClient({ course }: ReservationClientProps) {
  const handleSubmit = async (formData: {
    name: string;
    phone: string;
    email: string;
    company: string;
  }) => {
    try {
      // 예약 정보 서버에 저장
      const response = await fetch("/api/education/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course._id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details || data.error || "예약 정보 저장에 실패했습니다.",
        );
      }

      const { orderId } = data;

      // 토스페이먼츠 결제 초기화
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!,
      );

      await tossPayments.requestPayment("카드", {
        amount: course.fee,
        orderId,
        orderName: `[교육] ${course.name}`,
        customerName: formData.name,
        successUrl: `${window.location.origin}/education/checkout-success`,
        failUrl: `${window.location.origin}/education/checkout-fail`,
      });
    } catch (error: any) {
      console.error("결제 처리 중 오류 발생:", error);
      alert(
        error.message ||
          "결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    }
  };

  return (
    <div className="w-full flex gap-40">
      <div className="bg-white rounded-lg flex-1">
        <h2 className="text-xl font-bold mb-6">교육 신청</h2>
        <ReservationForm course={course} onSubmit={handleSubmit} />
      </div>
      <div className="mt-8">
        <EducationInfoArticle course={course} />
        <div className="mt-6 flex items-center justify-end gap-2">
          <div className="w-1/2 h-14">
            <Button
              onClick={() => history.back()}
              style="text-xl font-bold"
              styleType="secondary"
            >
              이전으로
            </Button>
          </div>
          <div className="w-1/2 h-14">
            <Button
              onClick={() => {
                const form = document.querySelector("form");
                if (form) {
                  form.requestSubmit();
                }
              }}
              styleType="primary"
              style="text-xl font-bold"
            >
              결제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
