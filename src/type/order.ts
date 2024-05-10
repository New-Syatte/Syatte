import { CartItem } from "./cart";

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
  shippingInfo: ShippingInfo;
  _id: string;
};

export type BillingAddress = {
  name: string;
  phone: string;
  userEmail: string;
};

export type ShippingAddress = {
  name: string;
  postalCode: string;
  city: string;
  line: string;
  phone: string;
  memo: string;
};

type OrderStatus =
  | "preparing"
  | "payed"
  | "ready"
  | "moving"
  | "done"
  | "canceled"
  | "unknown";

type ShippingInfo = {
  trackingNumber: string;
  carrierId: string;
  lastEventTime?: string;
  events?: TrackingResponseEvent[];
};

export type DeliveryTrackingResponse = {
  data: {
    track: {
      lastEvent: {
        status: {
          code: string;
        };
        time: string;
      };
      events: {
        edges: TrackingResponseEvent[];
      };
    };
  };
  errors?: TrackingResponseError[];
};

export type TrackingResponseEvent = {
  node: {
    status: {
      code: string;
    };
    time: string;
    description: string;
  };
};

export type TrackingResponseError = {
  message: string;
  extensions: {
    code: string;
  };
};
