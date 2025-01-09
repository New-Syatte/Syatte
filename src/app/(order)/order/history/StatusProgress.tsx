"use client";
import { BsChevronRight } from "react-icons/bs";
import { ORDER_STATUS } from "@/constants/status";
import { useOrders } from "@/hooks/useOrders";

type StatusCount = {
  payed: number;
  preparing: number;
  moving: number;
  done: number;
  canceled: number;
};

const StatusProgress = () => {
  const statusArray = ORDER_STATUS.map(status => status.value).slice(1, 5);
  const statusTitleArr = ORDER_STATUS.map(status => status.title).slice(1, 5);

  const { orders } = useOrders();

  const statusCount: StatusCount = {
    payed: 0,
    preparing: 0,
    moving: 0,
    done: 0,
    canceled: 0,
  };

  orders?.forEach(order => {
    if (order.orderStatus && statusCount.hasOwnProperty(order.orderStatus)) {
      statusCount[order.orderStatus as keyof StatusCount]++;
    }
  });

  return (
    <div className="w-full grid grid-cols-7 items-center gap-2 px-4">
      {statusArray.map((status, index) => (
        <div key={`status-group-${status}`} className="contents">
          <div className="col-span-1 flex flex-col justify-center items-center relative font-medium text-lg bg-bgWhiteSmoke w-full sm:h-[50px] h-[120px] rounded-md border border-lightGray p-3 sm:p-1">
            <p className="mb-2.5 sm:mb-0 text-[22px] sm:text-[10px] font-bold leading-4">
              {statusTitleArr[index]}
            </p>
            <p className="text-3xl sm:text-[14px] font-bold sm:pb-1 leading-none">
              {statusCount[status as keyof StatusCount] || 0}
            </p>
          </div>
          {index < statusArray.length - 1 && (
            <div className="col-span-1 flex justify-center items-center">
              <BsChevronRight className="text-3xl sm:text-sm text-black" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusProgress;
