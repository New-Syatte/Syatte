"use client";
import UserBox from "@/components/userBox/UserBox";
import NavMenu from "./NavMenu";
import Image from "next/image";
import NextLink from "@/components/NextLink/NextLink";
import STLogo from "@/assets/SYATT.svg";
import MMLogo from "@/assets/modern-masters-logo.png";
import MDLogo from "@/assets/midas-metal-logo.svg";
import styles from "./Header.module.scss";
import { User } from "@/model/user";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface HeaderProps {
  user: User | undefined;
}

const HeaderClient = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const [textColor, setTextColor] = useState("text-white");
  const [bgColor, setBgColor] = useState("bg-black");
  const [logo, setLogo] = useState(STLogo);

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

  return (
    <header className={styles.container + ` ${bgColor} ${"font-garamond"}`}>
      <NextLink href="/" className="ml-40">
        <Image src={logo} alt="Logo" width={85} height={27} />
      </NextLink>
      <nav className={`flex ml-6 gap-3 mr-4 items-center ${textColor}`}>
        <NavMenu pathname={pathname} textColor={textColor} />
        <NextLink href={"/cart"} className="text-xs font-semibold">
          CART
        </NextLink>
        <div>
          {user ? (
            <UserBox data={user} />
          ) : (
            <NextLink
              href="/signin"
              className={`flex gap-2 items-end hover:underline text-xs font-semibold before:content-[''] before:w-[2px] before:h-[12px] before:${textColor} before:mr-1`}
            >
              <p>LOGIN</p>
            </NextLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderClient;
