// 앱 라우트에서 사용하는 URL을 관리하는 파일입니다.
// 주로 Link의 href 속성 또는 useRouter에 사용됩니다.

import { getBaseUrl } from '@/utils/url';

// 개발 시 디버깅용 로그
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('URLS: Base URL:', getBaseUrl());
  console.log('URLS: Environment:', process.env.VERCEL_ENV || 'development');
}

const URLS = {
  rootURL: getBaseUrl(),
  GREETINGS: "/greetings",
  SIGNIN: "/signin",
  MIDAS_METAL: "/midas-metall",
  MODERN_MASTERS: "/modern-masters",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout-success",
  CHECKOUT_FAIL: "/checkout-fail",
  CHECKOUT_ADDRESS: "/checkout-address",
  EDUCATION: "/education",
  EDUCATION_DETAILS: "/education/details",
  ORDER_DETAILS: "/order/details",
  ORDER_HISTORY: "/order/history",
  EDUCATION_HISTORY: "/order/education-history",
  PRODUCT_STORE: "/store",
  PRODUCT_STORE_BRAND: "/store/brand",
  PRODUCT_DETAILS: "/store/details",
};

export default URLS;
