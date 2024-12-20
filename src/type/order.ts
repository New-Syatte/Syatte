import { CartItem } from "./cart";

export type Order = {
  userId: string;
  userEmail: string;
  displayName: string;
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
