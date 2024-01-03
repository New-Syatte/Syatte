import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CheckoutAddressClient from "@/app/(checkout)/checkout-address/CheckoutAddressClient";
import RouteComplete from "@/utils/RouteComplete";

export default async function CheckoutAddress() {
  const session = await getServerSession(authOptions); // 서버에서 session 정보 호출
  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  return (
    <RouteComplete>
      <CheckoutAddressClient />
    </RouteComplete>
  );
}
