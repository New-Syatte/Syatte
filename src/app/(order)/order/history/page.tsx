import StatusProgress from "./StatusProgress";
import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import Heading from "@/components/heading/Heading";
import OrderList from "./OrderList";

export default function OrderHistory() {
  return (
    <section className="w-full flex flex-col gap-y-40 sm:gap-y-10 font-kor">
      <div className="flex flex-col justify-start items-start">
        <Heading title="배송상황" fontSize="3xl" />
        <div className="border-b border-lightGray mb-7 w-full" />
        <StatusProgress />
      </div>
      <div>
        <div className="flex justify-between sm:flex-col mb-[30px] sm:mb-10 sm:pb-4 border-b border-lightGray">
          <Heading title="주문내역" fontSize="3xl" />
          <PeriodSelector />
        </div>
        <OrderList />
      </div>
    </section>
  );
}
