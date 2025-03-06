import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { addUser } from "@/services/sanity/user";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

export interface UserWithId extends User {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
}

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        // 로그인 로직 구현
        // 성공 시 사용자 객체 반환, 실패 시 null 반환
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // 여기에 실제 로그인 로직 구현
        // 예시: 
        return {
          id: "1",
          name: "사용자",
          email: credentials.email as string,
          image: "",
        };
      }
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || ""
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.id || !user?.email) {
        return false;
      }

      const userData = {
        id: user.id,
        name: user.name || "",
        email: user.email,
        image: user.image || "",
        username: user.email.split("@")[0]
      };

      await addUser(userData);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.email?.split("@")[0] || "";
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
