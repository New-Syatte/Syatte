import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserWithId } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OrderHistoryClient from "./OrderHistoryClient";
import URLS from "@/constants/urls";

export default async function OrderHistory() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(URLS.SIGNIN);
  }
  const user = session?.user as UserWithId;

  return <OrderHistoryClient userEmail={user.email} />;
}
