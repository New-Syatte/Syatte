import CartClient from "@/app/(cart)/cart/CartClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RouteComplete from "@/utils/RouteComplete";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/signin");
  }

  return (
    <RouteComplete>
      <CartClient />
    </RouteComplete>
  );
}
