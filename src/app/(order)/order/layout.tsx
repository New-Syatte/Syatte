import SideBar from "@/layouts/sideBar/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import URLS from "@/constants/urls";
import Heading from "@/components/heading/Heading";

const OrderLayout = async ({ children }: { children: React.ReactNode }) => {
  const links = [URLS.CART, URLS.ORDER_HISTORY];
  const listStr = ["나의 장바구니", "배송/주문 확인"];
  return (
    <section className="w-[80%] sm:w-full sm:my-0 mx-auto my-24 min-h-[80vh] flex flex-col items-center justify-center">
      <header className="w-full mb-16 sm:mb-5 box-border flex justify-start items-end sm:py-2 sm:pt-24">
        <Heading title="마이페이지" center fontSize="6xl sm:text-3xl" />
      </header>
      <div className="w-full flex sm:flex-col sm:justify-center sm:items-center sm:gap-10 gap-20">
        <SideBar linkArray={links} listStr={listStr} />
        <div className="w-full sm:w-[90%] flex flex-col gap-y-40">
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default OrderLayout;
