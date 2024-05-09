import CartClient from "@/app/(cart)/cart/CartClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import URLS from "@/constants/urls";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(URLS.SIGNIN);
  }

  return <CartClient />;
}
