import { CartItem } from "./cart";
import { DeliveryTrackingResponse } from "./order";

// 체크아웃 데이터 타입
export interface CheckoutData {
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

// 서버 액션 반환 타입
export type ServerActionResult<T> = Promise<{
  success: boolean;
  data?: T;
  error?: string;
}>;

// 배송 추적 서버 액션 타입
export type TrackDeliveryAction = (
  carrierId: string,
  trackingNumber: string,
) => Promise<DeliveryTrackingResponse>;

// 체크아웃 데이터 관련 서버 액션 타입
export type SetCheckoutDataAction = (data: string) => Promise<void>;
export type DeleteCheckoutDataAction = () => Promise<void>;

// 체크아웃 에러 처리 서버 액션 타입
export type HandleCheckoutErrorAction = (
  message: string,
  orderId: string,
) => Promise<never>;
