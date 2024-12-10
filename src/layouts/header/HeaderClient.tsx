"use client";
import UserBox from "@/components/userBox/UserBox";
import NavMenu from "./NavMenu";
import Image from "next/image";
import Link from "next/link";
import STLogo from "@/assets/SYATT.svg";
import MMLogo from "@/assets/modern-masters-logo.png";
import MDLogo from "@/assets/midas-metal-logo.svg";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import URLS from "@/constants/urls";
import { Mobile } from "@/hooks/useMediaQuery";
import Portal from "@/utils/Portal";
import MobileNavModal from "./MobileNavModal";
import { useSession } from "next-auth/react";

const HeaderClient = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [textColor, setTextColor] = useState("text-white");
  const [bgColor, setBgColor] = useState("bg-black");
  const [logo, setLogo] = useState(STLogo);
  const isMobile = Mobile();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/modern-masters" || pathname === "/midas-metall") {
      setTextColor("text-white");
      setBgColor("bg-black");
      if (pathname === "/modern-masters") {
        setLogo(MMLogo);
      }
      if (pathname === "/midas-metall") {
        setLogo(MDLogo);
      }
    } else {
      setTextColor("text-black");
      setBgColor("bg-white");
      setLogo(STLogo);
    }
  }, [pathname]);

  if (!isMobile)
    return (
      <header
        className={
          "flex relative z-10 w-full h-headerHeight px-[50px] justify-between items-center border-b border-tableBorderGray gap-1" +
          ` ${bgColor} ${"font-garamond"}`
        }
      >
        <Link href="/">
          <Image src={logo} alt="Logo" width={85} height={27} />
        </Link>
        <nav className={`flex ml-6 gap-3 mr-4 items-center ${textColor}`}>
          <NavMenu pathname={pathname} textColor={textColor} />
          <Link href={URLS.CART} className="text-xs font-semibold">
            CART
          </Link>
          <div>
            {session?.user ? (
              <UserBox data={session.user} />
            ) : (
              <Link
                href={URLS.SIGNIN}
                className={`flex gap-2 items-end hover:underline text-xs font-semibold before:content-[''] before:w-[2px] before:h-[12px] before:${textColor} before:mr-1`}
              >
                <p>LOGIN</p>
              </Link>
            )}
          </div>
        </nav>
      </header>
    );

  if (isMobile)
    return (
      <header
        className={
          "w-screen h-[55px] flex justify-between items-center fixed z-50 " +
          `${bgColor}`
        }
      >
        <div
          className="flex flex-col gap-1 ml-4"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="w-5 h-1 bg-[#e2e2e2]" />
          <div className="w-5 h-1 bg-[#e2e2e2]" />
          <div className="w-5 h-1 bg-[#e2e2e2]" />
        </div>
        <Link
          href="/"
          className={bgColor === "bg-black" ? "w-12 h-auto" : "w-20 h-auto"}
        >
          <Image
            src={logo}
            alt="Logo"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
        <div className="w-[20px]" />
        {isModalOpen && (
          <Portal selector="#portal">
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
              <div className="flex flex-col items-center justify-start w-4/5 h-full bg-white">
                <MobileNavModal
                  user={session?.user}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
              <div
                className="absolute w-1/5 top-0 right-0 h-screen"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </Portal>
        )}
      </header>
    );
  else return null;
};

export default HeaderClient;
