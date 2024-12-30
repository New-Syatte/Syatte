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

    if (!order) {
      console.error("Order not found for ID:", orderId);
      throw new Error(`주문을 찾을 수 없습니다 (ID: ${orderId})`);
    }

    return order;
  } catch (error: any) {
    console.error("Sanity order fetch error:", {
      message: error.message || "Unknown error",
      code: error.statusCode,
      name: error.name,
      stack: error.stack,
      orderId,
    });

    if (error.statusCode === 404) {
      throw new Error(`주문을 찾을 수 없습니다 (ID: ${orderId})`);
    }

    if (error.statusCode === 401 || error.statusCode === 403) {
      throw new Error("주문 조회 권한이 없습니다");
    }

    throw new Error(
      `주문 조회 실패: ${error.message || "알 수 없는 오류가 발생했습니다"}`,
    );
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
