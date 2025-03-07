import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import SignInClient from "@/components/Login/Signin";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";

type SearchParams = Promise<{
  callbackUrl?: string;
}>;

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  try {
    const session = await auth();
    const providers = await getProviders() || {};
    const params = await searchParams;
    const callbackUrl = params?.callbackUrl || "/";

    if (session) {
      redirect(callbackUrl);
    }

    return (
      <section className="py-16 px-4">
        <SignInClient providers={providers} callbackUrl={callbackUrl} />
      </section>
    );
  } catch (error) {
    console.error("Error in SignInPage:", error);
    
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
