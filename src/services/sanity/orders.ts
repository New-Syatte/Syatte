import { client, writeClient } from "@/services/sanity/sanity";
import { Order } from "@/type/order";

export async function getOrders(userId: string) {
  return client.fetch(
    `*[_type == "order" && userId == $userId] | order(orderDate desc)`,
    { userId },
  );
}

export async function getOrder(orderId: string) {
  if (!orderId) {
    throw new Error("orderId is required");
  }

  try {
    const order = await client.fetch(
      `*[ _type == "order" && _id == $orderId][0]{
        username,
        userEmail,
        orderDate,
        orderAmount,
        orderStatus,
        cartItems,
        billingAddress,
        shippingAddress,
        createdAt,
        shippingInfo,
        _id
      }`,
      { orderId },
    );
    return order;
  } catch (error: any) {
    console.error(`주문 불러오기 실패: ${error.message}`);
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  events: any[],
) {
  if (!orderId) {
    throw new Error("orderId is required");
  }

  try {
    await writeClient.patch(orderId).set({ orderStatus: status }).commit();

    await writeClient
      .patch(orderId)
      .set({ "shippingInfo.events": events })
      .commit();
  } catch (error: any) {
    console.error(`주문 상태 변경 실패: ${error.message}`);
    throw error;
  }
}

export async function createOrder(orderData: Order) {
  const order = {
    _type: "order",
    ...orderData,
  };
  return writeClient.create(order);
}
