import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { cookies } from "next/headers";
import { getAuthBaseUrl } from "@/utils/url";

// User 타입에 id를 추가한 인터페이스
interface UserWithId {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string; // 로그인 제공자 정보 추가
}

// 카카오 프로필 타입 정의
interface KakaoProfile {
  id: string | number;  // string 또는 number 타입 모두 허용
  kakao_account?: {
    profile?: {
      nickname?: string;
    };
    email?: string;
    has_email?: boolean;
    email_needs_agreement?: boolean;
  };
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
      // 카카오 로그인인 경우에는 이메일이 없어도 허용
      if (account?.provider === "kakao") {
        // 카카오는 이메일이 없어도 로그인 허용
        return true;
      }
      
      // 다른 제공자(Google 등)는 이메일 필수
      if (!user.email) {
        console.log("로그인 거부: 이메일 정보 없음", account?.provider);
        return false;
      }
      
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // 첫 로그인 시에만 user 정보가 전달됨
      if (user) {
        token.id = user.id || "unknown";
        
        // 로그인 제공자 정보 저장
        if (account?.provider) {
          token.provider = account.provider;
        }
        
        // 카카오 로그인인 경우 추가 정보 처리
        if (account?.provider === "kakao") {
          // unknown으로 변환 후 KakaoProfile로 타입 지정
          const kakaoProfile = profile as unknown as KakaoProfile;
          
          // 닉네임 설정
          if (kakaoProfile.kakao_account?.profile?.nickname) {
            token.name = kakaoProfile.kakao_account.profile.nickname;
          }
          
          // 이메일이 없는 경우 대체 이메일 생성
          if (!token.email && kakaoProfile.id) {
            // id가 숫자든 문자열이든 문자열로 변환
            token.email = `kakao_${String(kakaoProfile.id)}@example.com`;
          }
          
          // 디버깅용 로그
          console.log("카카오 프로필:", {
            id: kakaoProfile.id,
            hasEmail: kakaoProfile.kakao_account?.has_email,
            needsAgreement: kakaoProfile.kakao_account?.email_needs_agreement,
            providedEmail: kakaoProfile.kakao_account?.email,
            nickname: kakaoProfile.kakao_account?.profile?.nickname
          });
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      // JWT 토큰에서 사용자 정보를 세션에 추가
      if (token && session.user) {
        session.user.id = token.id as string;
        
        // 이메일이 없는 경우 (주로 카카오 로그인) 토큰에서 가져온 대체 이메일 사용
        if (!session.user.email && token.email) {
          session.user.email = token.email as string;
        }
        
        // 로그인 제공자 정보도 세션에 포함 (선택 사항)
        if (token.provider) {
          (session.user as any).provider = token.provider;
        }
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
    
    // 공통 유틸리티에서 기본 URL 가져오기
    const baseUrl = getAuthBaseUrl();
    console.log("Auth base URL:", baseUrl);
    
    // API 호출로 세션 확인
    const response = await fetch(`${baseUrl}/api/auth/session`, {
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
