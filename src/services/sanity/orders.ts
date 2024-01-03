import { client } from "@/services/sanity/sanity";

export async function getOrders(email: string) {
  if (!email) {
    throw new Error("userId is required");
  }

  try {
    const orders = await client.fetch(
      `*[ _type == "cart" && userEmail == $email]{
        username,
        userEmail,
        orderDate,
        orderAmount,
        orderStatus,
        cartItems,
        billingAddress,
        shippingAddress,
        createdAt,
        _id
      }`,
      { email },
    );
    return orders;
  } catch (error: any) {
    console.error(`주문 불러오기 실패: ${error.message}`);
  }
}

export async function getOrder(orderId: string) {
  if (!orderId) {
    throw new Error("orderId is required");
  }

  try {
    const order = await client.fetch(
      `*[ _type == "cart" && _id == $orderId][0]{
        username,
        userEmail,
        orderDate,
        orderAmount,
        orderStatus,
        cartItems,
        billingAddress,
        shippingAddress,
        createdAt,
        _id
      }`,
      { orderId },
    );
    return order;
  } catch (error: any) {
    console.error(`주문 불러오기 실패: ${error.message}`);
  }
}
