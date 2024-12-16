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
    throw new Error("주문 ID가 필요합니다");
  }

  try {
    console.log("Fetching order from Sanity:", orderId);
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
    console.log("Sanity order fetch result:", order);

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다");
    }

    return order;
  } catch (error: any) {
    console.error("Sanity order fetch error:", {
      error: error.message,
      orderId,
    });
    throw new Error(`주문 조회 실패: ${error.message}`);
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
