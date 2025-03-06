import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import SignInClient from "@/components/Login/Signin";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

type SearchParams = Promise<{
  callbackUrl?: string;
}>;

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  const providers = await getProviders() || {};
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || "/";

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <section className="py-16 px-4">
      <SignInClient providers={providers} callbackUrl={callbackUrl} />
    </section>
  );
}
