"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import useNextRouter from "@/hooks/useNextRouter";

const UserBox = ({ data }: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useNextRouter();
  const toggleHandler = () => {
    setToggleMenu(toggleMenu => !toggleMenu);
  };

  return (
    <div className="flex items-center gap-3 relative">
      <div className="flex cursor-pointer" onClick={() => signOut()}>
        <FiLogOut />
      </div>
      <div
        className="flex text-[16px] w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={toggleHandler}
      >
        <img src={data.image} />
      </div>
      {toggleMenu ? (
        <ul className="flex flex-col gap-2 w-[130px] top-10 right-0 absolute bg-white border border-lightGray p-2 justify-center items-center">
          <li
            onClick={() => {
              setToggleMenu(!toggleMenu);
              router?.push("/order/order-history");
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
  );
};

export default UserBox;
