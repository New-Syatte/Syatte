import { writeClient } from "@/services/sanity";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { classId, name, phone, email, company } = body;

    if (!classId || !name || !phone || !email) {
      return NextResponse.json(
        { error: "필수 입력 항목이 누락되었습니다." },
        { status: 400 },
      );
    }

    // 주문 ID 생성
    const orderId = nanoid();

    try {
      // Sanity에 예약 정보 저장
      const result = await writeClient.create({
        _type: "edu-reservation",
        orderId,
        userName: name,
        email,
        phone,
        company,
        class: {
          _type: "reference",
          _ref: classId,
        },
        status: "pending",
      });
      return NextResponse.json({ orderId });
    } catch (sanityError: any) {
      console.error("Sanity 에러 상세:", sanityError);
      return NextResponse.json(
        {
          error: "Sanity 데이터 저장 중 오류가 발생했습니다.",
          details: sanityError.message,
        },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("교육 예약 처리 중 오류 발생:", error);
    return NextResponse.json(
      {
        error: "교육 예약 처리 중 오류가 발생했습니다.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
