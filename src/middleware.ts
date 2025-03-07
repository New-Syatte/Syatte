import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // getToken 대신 auth 함수를 사용하여 세션 정보 가져오기
  const session = await auth();
  const token = session?.user;

  const { pathname } = request.nextUrl;

  // 인증이 필요한 경로들
  const authRequiredPaths = [
    "/checkout",
    "/checkout-success",
    "/order",
    "/api/payment",
  ];

  // 현재 경로가 인증이 필요한지 확인
  const isAuthRequired = authRequiredPaths.some(path =>
    pathname.startsWith(path),
  );

  // API 요청 처리
  if (pathname.startsWith("/api/")) {
    if (isAuthRequired && !token) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }

    const requestHeaders = new Headers(request.headers);
    if (token) {
      requestHeaders.set("x-user-id", token.id || "");
      requestHeaders.set("x-user-email", token.email || "");
      if (token.name) {
        requestHeaders.set("x-user-name", encodeURIComponent(token.name));
      }
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 페이지 요청 처리
  if (isAuthRequired && !token) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/checkout-success/:path*",
    "/order/:path*",
    "/api/payment/:path*",
    "/api/:path*",
  ],
};
