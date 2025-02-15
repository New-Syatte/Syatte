"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
    >
      이전 페이지로 돌아가기
    </button>
  );
}
