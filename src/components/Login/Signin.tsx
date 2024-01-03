"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import LoginButton from "../button/LoginButton";
import Loader from "@/components/loader/Loader";
import { useState } from "react";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};
export default function Signin({ providers, callbackUrl }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (id: string) => {
    setIsLoading(true);
    await signIn(id, { callbackUrl });
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col h-[100%]">
      {isLoading && <Loader />}
      <div className="flex text-[40px] mb-2">로그인</div>
      <div className="flex text-[18px] mb-6">SNS 계정으로 가입 및 로그인</div>
      <div className="flex flex-col gap-2">
        {Object.values(providers).map(({ name, id }) => (
          <LoginButton key={id} title={id} onClick={() => handleSignIn(id)} />
        ))}
      </div>
    </div>
  );
}
