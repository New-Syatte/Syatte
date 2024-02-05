"use client";
import NextLink from "@/components/NextLink/NextLink";

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
    "/education",
    "/greetings",
    "/modern-masters",
    "/midas-metall",
    "/store/all",
  ];

  return (
    <div className={`flex ${textColor} ml-6 items-center font-medium text-sm`}>
      {navMenu.map((menu, index) => (
        //pathname이 navLink와 같으면 underline
        <NextLink
          href={navLink[index]}
          key={index}
          className="mr-[74px] relative"
        >
          <p>{menu.toUpperCase()}</p>
          {pathname === navLink[index] ? (
            <div
              className={`h-[1px] w-full absolute top-[30px] left-0 ${
                textColor === "text-white" ? "bg-white" : "bg-black"
              }`}
            ></div>
          ) : null}
        </NextLink>
      ))}
    </div>
  );
};

export default NavMenu;
