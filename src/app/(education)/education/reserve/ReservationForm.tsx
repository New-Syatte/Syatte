"use client";

import { useState } from "react";
import { ClassSchema } from "@/type/edu";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface ReservationFormProps {
  classData: ClassSchema;
  onSubmit: (formData: {
    name: string;
    phone: string;
    email: string;
    company: string;
  }) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

const ReservationForm = ({ classData, onSubmit }: ReservationFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 현재 날짜 기준으로 종료 여부 확인
  const now = new Date();
  const isExpired = new Date(classData.endDate) < now;

  if (isExpired) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>이미 종료된 교육입니다.</p>
        <button
          onClick={() => router.push("/education")}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark"
        >
          교육 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    // 전화번호 검증
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone.replace(/-/g, ""))) {
      newErrors.phone = "올바른 전화번호를 입력해주세요";
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 주소를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드의 에러 메시지 제거
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // 날짜 포맷팅 에러 처리
  const formatDateSafely = (dateStr: string, formatStr: string) => {
    try {
      return format(new Date(dateStr), formatStr, { locale: ko });
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return "날짜 정보 없음";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{classData.name}</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2">
            <span className="font-semibold">일정:</span>{" "}
            {formatDateSafely(classData.startDate, "yyyy. MM. dd")} ~{" "}
            {formatDateSafely(classData.endDate, "MM. dd")}
            <span className="text-primary">
              {classData.schedule ? ` (${classData.schedule})` : ""}
            </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">장소:</span>{" "}
            {classData.location || "미정"}
          </p>
          <p>
            <span className="font-semibold">수강료:</span>{" "}
            {classData.fee.toLocaleString()}원
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            전화번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01012345678"
            className={`w-full p-2 border rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            회사명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">문의사항</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-32"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white rounded ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primaryDark"
          }`}
        >
          {isSubmitting ? "신청 중..." : "신청하기"}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
