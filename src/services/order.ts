import { client, writeClient } from "@/services/sanity/sanity";
import { CartItem } from "@/type/cart";
import { PaymentResponse } from "@/type/tossPayments";
import { formatTime } from "@/utils/formatTime";

interface OrderInput {
  payment: PaymentResponse;
  orderId: string;
  userId: string;
  userEmail: string;
  displayName: string;
  cartItems: CartItem[];
  shippingAddress: {
    name: string;
    phone: string;
    line?: string;
    city?: string;
    postalCode?: string;
    memo?: string;
  };
  billingAddress: {
    name: string;
    phone: string;
  };
}

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
      orderCount: input.cartItems.reduce(
        (sum, item) => sum + item.cartQuantity,
        0,
      ),
      orderStatus: "payed",
      cartItems: input.cartItems.map(item => ({
        _key: item.id,
        id: item.id,
        imageURL: item.imageURL,
        name: item.name,
        price: item.price,
        cartQuantity: item.cartQuantity,
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

    console.error("Order creation error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "주문 생성 중 오류가 발생했습니다",
    );
  }
}