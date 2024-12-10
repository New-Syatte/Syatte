import { ORDER_STATUS } from "@/constants/status";
import { Order } from "@/type/order";

interface OrderStatusProps {
  order: Order;
  className?: string;
}

export default function OrderStatus({
  order,
  className = "",
}: OrderStatusProps) {
  const statusTitleArr = ORDER_STATUS.map(status => status.title);
  const statusArray = ORDER_STATUS.map(status => status.value);
  const statusIndex = statusArray.indexOf(order.orderStatus);
  const statusTitle = statusTitleArr[statusIndex];

  return (
    <p className={`font-normal text-darkGray whitespace-nowrap ${className}`}>
      {statusTitle}
    </p>
  );
}
