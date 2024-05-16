"use client";
import { BsChevronRight } from "react-icons/bs";
import { ORDER_STATUS } from "@/constants/status";
import { useSelector } from "react-redux";
import { selectOrders } from "@/redux/slice/orderSlice";

const StatusProgress = () => {
  // orders 배열의 status 기준으로, status 별로 몇 개의 주문이 있는지 카운트
  const statusArray = ORDER_STATUS.map(status => status.value).slice(1, 5);
  const statusTitleArr = ORDER_STATUS.map(status => status.title).slice(1, 5);
  const orders = useSelector(selectOrders);

  const statusCount = orders.reduce((acc: any, cur: any) => {
    if (acc[cur.orderStatus]) {
      acc[cur.orderStatus] += 1;
    } else {
      acc[cur.orderStatus] = 1;
    }
    return acc;
  }, {});

  return (
    <div className="w-full flex justify-around items-center">
      {/* statusArray에서 각 요소들과, 그에 맞는 statusCount를 배치 */}
      {statusArray.map((status, index) => (
        <>
          <div className="flex flex-col justify-center items-center relative font-medium text-lg bg-bgWhiteSmoke w-[200px] sm:w-16 sm:h-[50px] h-[120px] rounded-md border border-lightGray p-3 sm:p-1">
            <p className="mb-2.5 sm:mb-0 text-[22px] sm:text-[10px] font-bold leading-4">
              {statusTitleArr[index]}
            </p>
            <p className="text-3xl sm:text-[14px] font-bold sm:pb-1 leading-none">
              {statusCount[status] ? statusCount[status] : 0}
            </p>
          </div>
          {index < statusArray.length - 1 && (
            <BsChevronRight className="text-3xl sm:text-sm text-black" />
          )}
        </>
      ))}
    </div>
  );
};

export default StatusProgress;
