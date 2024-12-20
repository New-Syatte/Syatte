import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { AuthOptions } from "next-auth";
import { addUser } from "@/services/sanity/user";
import { User } from "next-auth";

export interface UserWithId extends User {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID || "",
      clientSecret: process.env.NAVER_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID || "",
      clientSecret: process.env.KAKAO_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      if (!id) {
        return false;
      }
      const userData = {
        id,
        name: name || "Guest User",
        email: email || `${id}@placeholder.com`,
        image,
        username: email ? email.split("@")[0] : id,
      };

      await addUser(userData);
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
          id: token.id,
        } as UserWithId;
      }
      return session;
    },
  },
};
