import SideBar from "@/layouts/sideBar/SideBar";
import RouteComplete from "@/utils/RouteComplete";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const OrderLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions); // 서버에서 session 정보 호출
  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  const links = ["/cart", "/order/order-history"];
  const listStr = ["장바구니", "주문내역"];
  return (
    <RouteComplete>
      <section className="w-[1280px] mx-auto mb-[200px]">
        <header className="border-b-2 w-full border-whitegray h-[304px] mb-24 box-border flex justify-start items-end">
          <h2 className="text-[40px] font-semibold pb-[30px]">마이페이지</h2>
        </header>
        <div className="flex">
          <div className="mr-20">
            <SideBar linkArray={links} listStr={listStr} />
          </div>
          <div className="w-full flex flex-col gap-y-40">
            <div>{children}</div>
          </div>
        </div>
      </section>
    </RouteComplete>
  );
};

export default OrderLayout;
