import { client, writeClient } from "@/services/sanity";
import { Order } from "@/type/order";
import { PaymentResponse } from "@/type/tossPayments";
import { formatTime } from "@/utils/formatTime";

export async function getOrders(userId: string) {
  return client.fetch(
    `*[_type == "order" && userId == $userId] | order(orderDate desc)`,
    { userId },
  );
}

export async function getOrdersByEmail(userEmail: string) {
  return client.fetch(
    `*[_type == "order" && userEmail == $userEmail] | order(orderDate desc)`,
    { userEmail },
  );
}

// 이메일 또는 userId로 주문 조회 (카카오 로그인 사용자 대응)
export async function getOrdersByUserInfo(userId: string, userEmail?: string | null) {
  // 이메일이 있을 경우, 이메일과 userId 모두로 검색
  if (userEmail) {
    return client.fetch(
      `*[_type == "order" && (userEmail == $userEmail || userId == $userId)] | order(orderDate desc)`,
      { userId, userEmail },
    );
  }
  
  // 이메일이 없을 경우, userId로만 검색
  return getOrders(userId);
}

export async function getOrderByDeliveryInfo(
  carrierId: string,
  trackingNumber: string,
) {
  const orderId = await client.fetch(
    `*[_type == "order" && shippingInfo.carrierId == $carrierId && shippingInfo.trackingNumber == $trackingNumber][0] {
      _id,
      orderStatus
    }`,
    { carrierId, trackingNumber },
  );
  return orderId;
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

export type OrderInput = Omit<
  Order,
  | "_id"
  | "orderDate"
  | "createdAt"
  | "orderStatus"
  | "orderCount"
  | "shippingInfo"
  | "orderAmount"
> & {
  payment: PaymentResponse;
  orderId: string;
};

export async function createOrderFromPayment(input: OrderInput) {
  try {
    // 1. 기존 주문 확인 (읽기 작업은 client 사용)
    const existingOrder = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]`,
      { orderId: input.orderId },
    );

    // 이미 주문이 존재하면 해당 주문 반환
    if (existingOrder) {
      return existingOrder;
    }

    const now = new Date();

    // 2. 새 주문 생성 (쓰기 작업은 writeClient 사용)
    const order = await writeClient.create({
      _type: "order",
      _id: input.orderId,
      userId: input.userId,
      userEmail: input.userEmail,
      displayName: input.displayName,
      orderDate: formatTime(now.toISOString()).split(" ")[0], // YYYY-MM-DD
      createdAt: formatTime(now.toISOString()), // YYYY-MM-DD HH:mm:ss
      orderAmount: input.payment.totalAmount,
      orderCount: input.cartItems.reduce((sum, item) => sum + item.quantity, 0),
      orderStatus: "payed",
      cartItems: input.cartItems.map(item => ({
        _key: item._key,
        imageURL: item.imageURL,
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        colorCode: item.colorCode,
        productId: item.productId,
        discount: item.discount,
        quantity: item.quantity,
        product: {
          _type: "product",
          _ref: item.productId,
        },
      })),
      shippingAddress: {
        ...input.shippingAddress,
      },
      billingAddress: {
        ...input.billingAddress,
        userEmail: input.userEmail,
      },
      shippingInfo: {
        trackingNumber: "",
        carrierId: "",
        events: [],
      },
    });

    return order;
  } catch (error: any) {
    // Sanity 에러 처리
    console.error("Order creation error details:", {
      error: error.message,
      stack: error.stack,
      orderId: input.orderId,
      statusCode: error.statusCode,
    });

    if (error.statusCode === 409) {
      // 동시성 문제로 인한 중복 생성 시도

      const existingOrder = await client.fetch(
        `*[_type == "order" && _id == $orderId][0]`,
        { orderId: input.orderId },
      );
      if (existingOrder) {
        return existingOrder;
      }
    }

    throw new Error(
      error instanceof Error
        ? `주문 생성 실패: ${error.message}`
        : "주문 생성 중 오류가 발생했습니다",
    );
  }
}
