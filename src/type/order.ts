import { BaseCartItem, CheckoutCartItem } from "./cart";

// Sanity DB에 저장되는 주문 아이템
export interface OrderCartItem extends BaseCartItem {
  _key: string;
}

export interface Order {
  _id: string;
  userId: string;
  userEmail: string;
  displayName: string;
  orderDate: string;
  createdAt: string;
  orderAmount: number;
  orderCount: number;
  orderStatus: OrderStatus;
  cartItems: OrderCartItem[];
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  shippingInfo: ShippingInfo;
}

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
  _key: string;
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

export enum DeliveryErrorType {
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  INVALID_TRACKING_NUMBER = "INVALID_TRACKING_NUMBER",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface DeliveryError {
  type: DeliveryErrorType;
  message: string;
}

export type OrderInput = {
  payment: PaymentResponse;
  orderId: string;
  userId: string;
  userEmail: string;
  displayName: string;
  cartItems: CheckoutCartItem[];
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
};
