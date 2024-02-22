import { client } from "@/services/sanity/sanity";
import { IOrder } from "@/type";

export async function getCart(username: string) {
  return client.fetch(`
  *[_type == "order" && author->username == "${ username }"][0]
  *[_type == "order" && author->username == "${ username }"][0]
  {
    ...,
    "id":_id,
  }
  `);
}

export async function saveCart({
  id,
  userEmail,
  billingAddress,
  shippingAddress,
  cartItems,
  orderStatus,
  orderAmount,
  orderCount,
  orderDate,
  createdAt,
}: IOrder) {
  const cart = {
    _type: "cart",
    _id: id,
    userEmail: userEmail,
    billingAddress: billingAddress,
    shippingAddress: shippingAddress,
    cartItems: cartItems,
    orderStatus: orderStatus,
    orderAmount: orderAmount,
    orderCount: orderCount,
    orderDate: orderDate,
    createdAt: createdAt,
  };
  return client.create(cart);
}
