import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getOrders } from "@/services/sanity/orders";
import { UserWithId } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import StatusProgress from "./StatusProgress";
import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import OrderList from "./OrderList";

export default async function OrderHistory() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const user = session?.user as UserWithId;
  const orders = await getOrders(user.email);

  return (
    <div className="w-full flex flex-col gap-y-40">
      <StatusProgress orders={orders} />
      <div>
        <div className="flex justify-between mb-[30px]">
          <h2 className="text-xl font-semibold">주문 내용</h2>
          <PeriodSelector />
        </div>
        <OrderList orders={orders} />
      </div>
    </div>
  );
}
