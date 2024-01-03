"use client";
import { BsChevronRight } from "react-icons/bs";
import { Order } from "@/model/order";
import { ORDER_STATUS } from "@/constants/status";

interface StatusProgressProps {
  orders: Order[];
}

const StatusProgress = ({ orders }: StatusProgressProps) => {
  // orders 배열의 status 기준으로, status 별로 몇 개의 주문이 있는지 카운트
  const statusArray = ORDER_STATUS.map(status => status.value).slice(1, 5);
  const statusTitleArr = ORDER_STATUS.map(status => status.title).slice(1, 5);
  const statusCount = orders.reduce((acc: any, cur: any) => {
    if (acc[cur.orderStatus]) {
      acc[cur.orderStatus] += 1;
    } else {
      acc[cur.orderStatus] = 1;
    }
    return acc;
  }, {});

  return (
    <div className="w-full h-[120px] bg-[#f1f1f5] flex justify-around items-center">
      {/* statusArray에서 각 요소들과, 그에 맞는 statusCount를 배치 */}
      {statusArray.map((status, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center relative font-medium text-lg"
        >
          <p className="mb-2.5">{statusTitleArr[index]}</p>
          <p>{statusCount[status] ? statusCount[status] : 0}</p>
          {status !== "done" && (
            <BsChevronRight className="absolute -right-[68px] text-darkgray" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusProgress;
