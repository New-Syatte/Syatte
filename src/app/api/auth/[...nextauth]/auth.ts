import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { cookies } from "next/headers";

// User 타입에 id를 추가한 인터페이스
interface UserWithId {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // 첫 로그인 시에만 user 정보가 전달됨
      if (user) {
        token.id = user.id || "unknown";
      }

      if (account?.provider === "kakao" && profile) {
        const kakaoProfile = profile as any;
        if (kakaoProfile.kakao_account?.profile?.nickname) {
          token.name = kakaoProfile.kakao_account.profile.nickname;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      // JWT 토큰에서 사용자 정보를 세션에 추가
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  basePath: "/api/auth",
} satisfies NextAuthConfig;

// 새로운 Next-Auth 설정 방식
const { handlers, auth: nextAuth, signIn, signOut } = NextAuth(authConfig);

// 세션 확인용 클라이언트 사이드 API 확인
async function getSession() {
  try {
    const cookiesList = await cookies();
    const cookiesStr = cookiesList.getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");
    
    console.log("Getting auth session with cookies");
    
    // API 호출로 세션 확인
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/session`, {
      headers: {
        cookie: cookiesStr,
      },
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.log("Session API error:", response.status);
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}

// Next.js 15에서는 headers()와 cookies()를 비동기적으로 처리해야 함
export const auth = async () => {
  try {
    // 세션 데이터 가져오기 - API 호출 방식 사용
    const session = await getSession();
    
    if (session && session.user) {
      console.log("Session found:", session.user.name);
      return session;
    } else {
      // 세션이 없으면 null 반환
      console.log("No session found");
      return null;
    }
  } catch (error) {
    console.error("Auth error:", error);
    // 에러 상세 정보 출력
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
};

export { handlers, signIn, signOut };
