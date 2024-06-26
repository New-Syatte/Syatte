import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CheckoutClient from "@/app/(checkout)/checkout/CheckoutClient";
import URLS from "@/constants/urls";

export default async function Checkout() {
  const session = await getServerSession(authOptions); // 서버에서 session 정보 호출
  const user = session?.user;
  if (!user) {
    redirect(URLS.SIGNIN);
  }
  return (
    <>
      <CheckoutClient />
    </>
  );
}
