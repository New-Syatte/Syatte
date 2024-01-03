'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const SuccessPage = () => {
    const { data } = useSession();

  return (
    <div>
      {data ?
            <main className="flex flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-semibold">
              로그인 테스트 페이지입니다.
            </h1>
            <h1 className="text-4xl font-semibold">
              현재 유저는 {data.user?.name}
              입니다.
            </h1>
            <h1 className="text-4xl font-semibold">
              이메일은 {data.user?.email}입니다.
            </h1>
            <button onClick={() => signOut()} className="mt-10 flex">[로그아웃]</button>
          </main>
      : ""}
    </div>
  );
};

export default SuccessPage;
