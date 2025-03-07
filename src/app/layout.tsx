import "./globals.css";
import { EB_Garamond, Crimson_Pro, Noto_Sans_KR } from "next/font/google";
import Footer from "@/layouts/footer/Footer";
import Providers from "./Providers";
import Header from "@/layouts/header/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["700", "600", "500", "400"],
  variable: "--font-garamond",
  display: "swap",
});

export const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["700", "600", "500", "400", "300", "200"],
  variable: "--font-crimson",
  display: "swap",
});

export const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  preload: true,
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "Syatt",
  description:
    "SYATT 특수페인팅 세계 독특하고 창의적인 페인팅 기술의 아름다운 세계에서 새로운 예술과 디자인을 경험해보세요.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ko"
      className={`${garamond.variable} ${crimson.variable} ${notoSansKR.variable}`}
    >
      <body>
        <Providers>
          <Header />
          <section className="block min-h-contentHeight bg-white">
            {children}
          </section>
          <Footer />
        </Providers>
        <div id={"portal"} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
