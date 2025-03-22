"use client";

import { signIn, getProviders } from "next-auth/react";
import LoginButton from "../button/LoginButton";
import Loader from "@/components/loader/Loader";
import { useState, useEffect } from "react";

// Next-auth v5에서 호환되는 Provider 타입 정의
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type Props = {
  callbackUrl: string;
};

export default function Signin({ callbackUrl }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    const loadProviders = async () => {
      setIsLoading(true);
      const providersData = await getProviders();
      setProviders(providersData);
      setIsLoading(false);
    };
    
    loadProviders();
  }, []);

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
        {providers && Object.values(providers).map((provider: any) => (
          <LoginButton 
            key={provider.id} 
            title={provider.id} 
            onClick={() => handleSignIn(provider.id)} 
          />
        ))}
      </div>
    </div>
  );
}
