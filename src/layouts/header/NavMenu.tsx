"use client";
import Link from "next/link";
import URLS from "@/constants/urls";

interface NavMenuProps {
  pathname: string;
  textColor: string;
}
const NavMenu = ({ pathname, textColor }: NavMenuProps) => {
  const navMenu = [
    "education",
    "greetings",
    "modern masters",
    "midas metall",
    "store",
  ];
  const navLink = [
    URLS.EDUCATION,
    URLS.GREETINGS,
    URLS.MODERN_MASTERS,
    URLS.MIDAS_METAL,
    URLS.PRODUCT_STORE,
  ];

  return (
    <div className={`flex ${textColor} ml-6 items-center font-medium text-sm`}>
      {navMenu.map((menu, index) => (
        //pathname이 navLink와 같으면 underline
        <Link href={navLink[index]} key={index} className="mr-[74px] relative">
          <p>{menu.toUpperCase()}</p>
          {pathname === navLink[index] ? (
            <div
              className={`h-[1px] w-full absolute top-[30px] left-0 ${
                textColor === "text-white" ? "bg-white" : "bg-black"
              }`}
            ></div>
          ) : null}
        </Link>
      ))}
    </div>
  );
};

export default NavMenu;
