// 앱 라우트에서 사용하는 URL을 관리하는 파일입니다.
// 주로 Link의 href 속성 또는 useRouter에 사용됩니다.

// Vercel 환경 변수를 활용한 URL 설정
const getBaseUrl = () => {
  // 개발 환경
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Vercel 배포 환경에서는 VERCEL_URL 환경 변수 사용
  if (process.env.VERCEL_URL) {
    // VERCEL_URL은 이미 호스트명만 포함하고 있으므로 프로토콜 추가
    const url = process.env.VERCEL_URL;
    
    // VERCEL_URL이 이미 https://로 시작하는지 확인
    if (url.startsWith('http')) {
      return url;
    }
    
    // https:// 추가
    return `https://${url}`;
  }
  
  // 기본값은 프로덕션 URL (혹은 프리뷰 URL)
  // 브랜치 환경에 따라 URL 결정
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://syatt-deploy.vercel.app';
  }
  
  // 프리뷰 또는 개발 환경 (dev 브랜치 등)
  if (process.env.VERCEL_ENV === 'preview') {
    return 'https://syatt-deploy-2oi8-git-dev-ruddnjs3769s-projects.vercel.app';
  }
  
  // 최종 기본값
  return 'https://syatt-deploy.vercel.app';
};

// 개발 시 디버깅용 로그
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Base URL:', getBaseUrl());
  console.log('VERCEL_URL:', process.env.VERCEL_URL);
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
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
