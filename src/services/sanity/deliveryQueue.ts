import { writeClient, client } from "@/services/sanity";

// 배송 큐 생성
export const createDeliveryQueue = async ({
  carrierId,
  trackingNumber,
  orderId,
}: {
  carrierId: string;
  trackingNumber: string;
  orderId: string;
}) => {
  await writeClient.create({
    _type: "deliveryQueue",
    _id: orderId,
    carrierId,
    trackingNumber,
    status: "pending",
    retryCount: 0,
    createdAt: new Date().toISOString(),
    order: {
      _type: "reference",
      _ref: orderId,
    },
  });
};

// 배송 큐 조회
export const getDeliveryQueueItems = async () => {
  const queueItems = await client.fetch(`
    *[_type == "deliveryQueue" && status == "pending" && retryCount < 3] | order(createdAt asc)[0...10] {
      _id,
      carrierId,
      trackingNumber,
      retryCount
    }
  `);
  return queueItems;
};

// 배송 큐 상태 업데이트
export const updateQueueStatus = async ({
  _id,
  status,
  processedAt,
  retryCount,
}: {
  _id: string;
  status: string;
  processedAt: string;
  retryCount?: number;
}) => {
  await writeClient
    .patch(_id)
    .set({ status: status, processedAt, retryCount })
    .commit();
};

// 배송 큐 삭제
export const deleteQueueItem = async (_id: string) => {
  await writeClient.delete(_id);
};
