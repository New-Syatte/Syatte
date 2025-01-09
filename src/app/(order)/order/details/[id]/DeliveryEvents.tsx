"use client";
import { useOrderTracking } from "@/hooks/useOrderTracking";
import { Order } from "@/type/order";
import { useEffect } from "react";

const DeliveryEvents = ({ order }: { order: Order }) => {
  const { trackingData, isLoading, isError, startTracking } =
    useOrderTracking(order);

  useEffect(() => {
    startTracking();
  }, [order.orderStatus]);

  return (
    <div className="flex flex-col w-full pb-24 sm:pb-10 p-7 border-b-2 border-colorBlack">
      <h2 className="text-xl sm:text-sm font-bold w-1/4 sm:w-full mb-6">
        배송 현황
      </h2>
      {trackingData &&
        trackingData.data.track.events.edges.map((event, index) => (
          <div
            key={index}
            className="flex h-28 sm:h-auto pb-4 border-b border-lightGray mb-8 flex-col gap-2 sm:text-sm"
          >
            <p className="font-bold">{event.node.status.code}</p>
            <p>{new Date(event.node.time).toLocaleString()}</p>
            <p>{event.node.description}</p>
          </div>
        ))}
    </div>
  );
};

export default DeliveryEvents;
