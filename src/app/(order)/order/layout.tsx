import SideBar from "@/layouts/sideBar/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import URLS from "@/constants/urls";
import Heading from "@/components/heading/Heading";

const OrderLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions); // 서버에서 session 정보 호출
  const user = session?.user;
  if (!user) {
    redirect(URLS.SIGNIN);
  }
  const links = [URLS.CART, URLS.ORDER_HISTORY];
  const listStr = ["나의 장바구니", "배송/주문 확인"];
  return (
    <section className="w-[80%] mx-auto my-24 min-h-[80vh] flex flex-col items-center justify-center">
      <header className="w-full mb-16 box-border flex justify-start items-end">
        <Heading title="마이페이지" fontSize="6xl" />
      </header>
      <div className="w-full flex gap-20">
        <SideBar linkArray={links} listStr={listStr} />
        <div className="w-full flex flex-col gap-y-40">
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default OrderLayout;
