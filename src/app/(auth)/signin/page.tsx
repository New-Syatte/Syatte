import { redirect } from "next/navigation";
import SignInClient from "@/components/Login/Signin";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";
import { cookies, headers } from "next/headers";

// 동적 렌더링 설정 추가
export const dynamic = 'force-dynamic';

// Next.js 15.1.6에 맞게 타입 정의 (공식 문서 기준)
type Params = Promise<{ slug?: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Next.js 15의 비동기 headers와 cookies를 처리하기 위한 유틸리티 함수
const waitForPromise = async <T,>(promise: Promise<T> | T): Promise<T> => {
  try {
    return await promise;
  } catch (e) {
    // 이미 처리된 경우 무시
    return promise as T;
  }
};

// Next.js 15.1.6에 맞게 props 타입 및 구현 수정 (공식 문서 기준)
export default async function SignInPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  try {
    // Next.js 15에서는 비동기 API 처리
    await waitForPromise(headers());
    await waitForPromise(cookies());
    
    // 파라미터 처리 - 문서에 따라 props에서 추출
    const params = await props.params;
    const searchParams = await props.searchParams;
    
    // callbackUrl 처리
    let callbackUrl = "/";
    const callbackParam = searchParams.callbackUrl;
    
    if (callbackParam) {
      try {
        const rawCallbackUrl = Array.isArray(callbackParam) 
          ? callbackParam[0] 
          : callbackParam;
        
        // URL 디코딩 수행
        callbackUrl = decodeURIComponent(rawCallbackUrl);
      } catch (e) {
        console.error("Error decoding callbackUrl:", e);
        callbackUrl = "/";
      }
    }
    
    console.log("SignIn page - Checking session...");
    
    // 세션 확인
    const session = await auth();
    
    console.log("SignIn page - Session result:", session ? "Found" : "Not found");
    
    // 로그인된 경우 리다이렉트 - 순수 클라이언트 리다이렉션 사용
    if (session && session.user) {
      console.log(`Redirecting to: ${callbackUrl}`);
      
      // Next.js의 redirect 함수 대신 HTML 전체를 반환
      // meta refresh 태그와 JavaScript 리다이렉션 모두 사용
      return (
        <html>
          <head>
            <meta httpEquiv="refresh" content={`0;url=${callbackUrl}`} />
            <title>로그인 성공</title>
            <style dangerouslySetInnerHTML={{ __html: `
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
              }
              .container {
                text-align: center;
                padding: 2rem;
                border-radius: 0.5rem;
                background-color: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 500px;
              }
              h1 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
              }
              p {
                margin-bottom: 1.5rem;
                color: #666;
              }
              a {
                display: inline-block;
                padding: 0.5rem 1rem;
                background-color: #4a7dff;
                color: white;
                text-decoration: none;
                border-radius: 0.25rem;
                transition: background-color 0.2s;
              }
              a:hover {
                background-color: #3a67d8;
              }
            `}} />
          </head>
          <body>
            <div className="container">
              <h1>로그인 성공</h1>
              <p>잠시 후 자동으로 이동합니다.</p>
              <a href={callbackUrl}>지금 이동하기</a>
            </div>
            <script dangerouslySetInnerHTML={{ __html: `
              // 여러 리다이렉션 방법을 시도
              setTimeout(function() {
                window.location.replace("${callbackUrl}");
              }, 100);
              
              // 백업 리다이렉션
              setTimeout(function() {
                window.location.href = "${callbackUrl}";
              }, 500);
            `}} />
          </body>
        </html>
      );
    }

    // 로그인이 필요한 경우
    console.log("Login required, showing login form");
    return (
      <section className="py-16 px-4">
        <SignInClient callbackUrl={callbackUrl} />
      </section>
    );
  } catch (error) {
    console.error("Error in SignInPage:", error);
    
    // 오류 정보 상세 출력
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // 오류 발생 시 기본 로그인 화면 표시
    return (
      <section className="py-16 px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">로그인</h1>
          <p className="mb-8 text-red-500">로그인 페이지를 불러오는 중 오류가 발생했습니다.</p>
          <Link href="/" className="text-blue-500 hover:underline">홈으로 돌아가기</Link>
        </div>
      </section>
    );
  }
}
