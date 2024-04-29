"use client";
import URLS from "@/constants/urls";
import { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/redux/slice/cartSlice";

interface MobileNavModalProps {
  user: any;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavModal = ({ user, setIsModalOpen }: MobileNavModalProps) => {
  const cartLength = useSelector(selectCartItems).length;

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

  const ButtonStyle =
    "w-full h-9 border border-black text-center flex items-center justify-center text-black font-bold text-sm cursor-pointer";

  const name = user ? (user.name ? user.name : user.username) : "";

  return (
    <div className="w-5/6 font-NotoSansKR relative flex flex-col h-full">
      <div
        className="absolute top-5 right-0 cursor-pointer w-6 h-6 before:content-['\00d7'] before:text-2xl before:text-[#b2b2b2]"
        onClick={() => setIsModalOpen(false)}
      />
      {user ? (
        <>
          <div className="flex flex-col justify-center items-center mt-10 gap-5 text-xl mb-8">
            <Image
              width={65}
              height={65}
              src={user.image}
              alt="userImage"
              className="rounded-full"
            />
            <h2>{name}</h2>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2 mb-6">
            <Link
              href={URLS.ORDER_HISTORY}
              className={ButtonStyle}
              onClick={() => setIsModalOpen(false)}
            >
              마이페이지
            </Link>
            <Link
              href={URLS.CART}
              className={ButtonStyle}
              onClick={() => setIsModalOpen(false)}
            >
              장바구니 &nbsp;
              <span className="text-white text-[10px] bg-primaryBlue rounded-full w-4 h-4 flex justify-center items-center">
                {cartLength}
              </span>
            </Link>
          </div>
        </>
      ) : (
        <div className="h-1/3" />
      )}
      <div className="flex flex-col justify-start w-full items-start gap-5">
        <h2 className="font-bold text-lg">메뉴</h2>
        <ul className="flex flex-col gap-5">
          {navMenu.map((menu, index) => (
            <li key={index}>
              <Link href={navLink[index]} onClick={() => setIsModalOpen(false)}>
                {menu.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-self-end flex-col justify-end items-center flex-grow pb-3 gap-2">
        <p className=" text-[10px]">© 2024 SYATT</p>
        {user ? (
          <button
            className="w-full h-9 bg-primaryBlue text-center flex items-center justify-center text-white text-[13px] cursor-pointer"
            onClick={() => signOut()}
          >
            로그아웃
          </button>
        ) : (
          <Link
            href={URLS.SIGNIN}
            className="w-full h-9 bg-primaryBlue text-center flex items-center justify-center text-white text-[13px] cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNavModal;
