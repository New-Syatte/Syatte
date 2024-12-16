import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import SignInClient from "@/components/Login/Signin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PageProps {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function SignInPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  const callbackUrl = searchParams?.callbackUrl || "/";

  if (session) {
    redirect(callbackUrl);
  }

  if (!providers) {
    redirect("/");
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <SignInClient providers={providers} callbackUrl={callbackUrl} />
    </section>
  );
}
