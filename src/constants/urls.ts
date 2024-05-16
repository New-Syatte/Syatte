// 앱 라우트에서 사용하는 URL을 관리하는 파일입니다.
// 주로 Link의 href 속성 또는 useRouter에 사용됩니다.

const URLS = {
  rootURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://syatt-deploy.vercel.app",
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
  PRODUCT_STORE: "/store",
  PRODUCT_STORE_SEARCH: "/store/search",
  PRODUCT_DETAILS: "/store/details",
};

export default URLS;
