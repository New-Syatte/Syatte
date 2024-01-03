// 프로젝트 전역에서 사용할 타입들을 정의하는 파일입니다.
// 프로젝트 구성에 따라 변경 가능합니다.

export interface IProduct {
  id: string;
  brand: string;
  category: string;
  desc: string;
  imageURL: string;
  name: string;
  price: number;
}

export interface IShippingAddress {
  _type: string;
  city: string;
  line: string;
  name: string;
  postalCode: string;
  phone: string;
}

export interface IBillingAddress {
  _type: string;
  phone: string;
  name: string;
  userEmail: string;
  memo: string;
}


export interface ICartItem {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  cartQuantity: number;
}

export interface IOrder {
  id: string;
  userEmail: string;
  orderDate: string;
  orderAmount: number;
  orderCount: number;
  orderStatus: string;
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;
  billingAddress: IBillingAddress;
  createdAt: string;
}
