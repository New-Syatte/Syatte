"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import URLS from "@/constants/urls";

const UserBox = ({ data }: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  const toggleHandler = () => {
    setToggleMenu(toggleMenu => !toggleMenu);
  };
  const name = data.name ? data.name : data.username;

  return (
    <div className="flex items-center gap-2 font-garamond before:content-[''] before:w-[2px] before:h-[12px] before:bg-black ">
      <div className="hover:underline cursor-pointer flex items-center justify-center gap-1 relative">
        <div className="text-xs font-kor font-medium" onClick={toggleHandler}>
          <p>{name}</p>
        </div>
        {toggleMenu ? (
          <ul className="flex flex-col gap-2 w-[130px] top-10 right-0 absolute bg-white border border-lightGray p-2 justify-center items-center">
            <li
              onClick={() => {
                setToggleMenu(!toggleMenu);
                router.push(URLS.ORDER_HISTORY);
              }}
              className="flex text-[16px] text-black cursor-pointer hover:underline"
            >
              주문 내역
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <div
        className="flex cursor-pointer text-xs font-medium ml-10"
        onClick={() => signOut()}
      >
        LOGOUT
      </div>
    </div>
  );
};

export default UserBox;
