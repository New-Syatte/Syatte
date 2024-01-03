export type Order = {
  userEmail: string;
  orderDate: string;
  createdAt: string;
  orderAmount: number;
  orderCount: number;
  orderStatus: OrderStatus;
  cartItems: CartItem[];
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  _id: string;
};

type CartItem = {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  cartQuantity: number;
};

type BillingAddress = {
  name: string;
  phone: string;
  userEmail: string;
  memo: string;
};

type ShippingAddress = {
  name: string;
  postalCode: string;
  city: string;
  line: string;
  phone: string;
};

type OrderStatus =
  | "preparing"
  | "payed"
  | "ready"
  | "moving"
  | "done"
  | "canceled";
