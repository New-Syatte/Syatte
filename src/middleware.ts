import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 세션 쿠키 이름 목록
const SESSION_COOKIE_NAMES = [
  // 새로운 Auth.js 쿠키 이름 (Next.js 15+)
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "__Host-authjs.session-token",
  
  // 기존 next-auth 쿠키 이름
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "__Host-next-auth.session-token",
  "next-auth.session-token.0",
  "__Secure-next-auth.session-token.0",
];

// 쿠키로 세션 존재 여부 확인
function hasSessionCookie(request: NextRequest): boolean {
  // 모든 쿠키 확인
  const cookies = Array.from(request.cookies.getAll());
  
  // 세션 쿠키가 있는지 확인
  return cookies.some(cookie => SESSION_COOKIE_NAMES.includes(cookie.name));
}

export async function middleware(request: NextRequest) {
  // 인증이 필요한 경로들
  const authRequiredPaths = [
    "/checkout",
    "/checkout-success",
    "/order",
    "/api/payment",
  ];
  
  const { pathname } = request.nextUrl;
  
  // signin 페이지는 처리하지 않음
  if (pathname.startsWith('/signin')) {
    return NextResponse.next();
  }
  
  // 인증이 필요한 경로인지 확인
  const isAuthRequired = authRequiredPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // 인증이 필요하지 않은 경로는 바로 처리
  if (!isAuthRequired) {
    return NextResponse.next();
  }
  
  // 세션 쿠키 존재 확인 (간단히 쿠키 존재 여부만 확인)
  const hasSession = hasSessionCookie(request);
  
  if (hasSession) {
    return NextResponse.next();
  }
  
  // 인증되지 않은 경우 - API 요청이면 401 응답
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  
  // 페이지 요청이면 로그인 페이지로 리다이렉트
  const loginUrl = new URL('/signin', request.url);
  loginUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/checkout-success/:path*",
    "/order/:path*",
    "/api/payment/:path*",
    "/api/:path*",
    "/signin",
  ],
};
