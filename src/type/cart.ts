// 장바구니 아이템의 기본 속성
export interface BaseCartItem {
  productId: string;
  imageURL: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  color: string;
  colorCode: string;
  size: string;
}

// 클라이언트에서 사용하는 장바구니 아이템
export interface CartItem extends BaseCartItem {
  isChecked: boolean;
  key: string;
}

// 체크아웃용 장바구니 아이템
export type CheckoutCartItem = Omit<CartItem, "isChecked">;
