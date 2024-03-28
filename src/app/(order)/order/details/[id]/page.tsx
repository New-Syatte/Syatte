import OrderProduct from "@/app/(order)/order/history/OrderProduct";
import { getOrder } from "@/services/sanity/orders";
import deliveryFee from "@/constants/deliveryFee";
import Link from "next/link";
import { Order } from "@/type/order";
import URLS from "@/constants/urls";
interface OrderDetailsProps {
  params: {
    id: string;
  };
}

const OrderDetails = async ({ params }: OrderDetailsProps) => {
  const { id } = params;
  const order: Order = await getOrder(id);
  const orderTime = new Date(order.createdAt);
  const formattedOrderTime = orderTime.toLocaleString("ko-KR", {
    timeZone: "UTC",
  });

  const deliveryEvents = order.shippingInfo?.events;
  return (
    <>
      <div className="w-full border-b-2 border-colorBlack pb-14">
        <OrderProduct order={order} />
      </div>
      <div className="flex w-full border-b-2 border-colorBlack pb-24 gap-x-28 p-7">
        <h2 className="text-xl font-bold w-32">배송지 정보</h2>
        <div className="text-darkGray">
          <div className="flex gap-7 mb-2">
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
          <div className="flex gap-7 mb-2">
            <p>{order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.city}</p>
            <p>{order.shippingAddress.line}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full pb-24 p-7 justify-between border-b-2 border-colorBlack">
        <div className="flex gap-x-28">
          <h2 className="text-xl font-bold w-32">주문 결제 정보</h2>
          <div className="text-darkGray">
            <div>결제 수단</div>
            <div>{formattedOrderTime}</div>
          </div>
        </div>
        <div className="text-xl w-72">
          <div className="flex justify-between">
            <p>상품 총 금액</p>
            <p>{order.orderAmount}원</p>
          </div>
          <div className="flex justify-between text-darkGray">
            <p>배송비</p>
            <p>{deliveryFee}원</p>
          </div>
          <div className="flex justify-between mt-10">
            <h2> 총 결제 금액</h2>
            <p className="text-[#ccb579] text-2xl">
              {order.orderAmount + deliveryFee}원
            </p>
          </div>
        </div>
      </div>
      {deliveryEvents && (
        <div className="flex flex-col w-full pb-24 p-7">
          <h2 className="text-xl font-bold w-32 mb-6">배송 현황</h2>
          {deliveryEvents.map((event, index) => (
            <div key={index} className="flex h-28 flex-col gap-2 p-6">
              <p className="font-bold">{event.node.status.code}</p>
              <p>{new Date(event.node.time).toLocaleString()}</p>
              <p>{event.node.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <Link
          className="border border-colorBlack w-[350px] h-[80px] text-2xl font-bold flex justify-center items-center"
          href={URLS.ORDER_HISTORY}
        >
          주문 목록
        </Link>
      </div>
    </>
  );
};

export default OrderDetails;
