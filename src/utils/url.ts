// URL 관련 유틸리티 함수들

/**
 * 환경에 따른 기본 URL을 가져오는 함수
 * @returns {string} 환경에 맞는 기본 URL
 */
export const getBaseUrl = () => {
  // URL 끝의 슬래시 처리를 표준화하는 함수
  const normalizeUrl = (url: string) => {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  };

  // 개발 환경
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Vercel 배포 환경에서는 VERCEL_URL 환경 변수 사용
  if (process.env.VERCEL_URL) {
    const url = process.env.VERCEL_URL;
    
    // VERCEL_URL이 이미 https://로 시작하는지 확인
    if (url.startsWith('http')) {
      return normalizeUrl(url);
    }
    
    // https:// 추가
    return normalizeUrl(`https://${url}`);
  }
  
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

/**
 * NextAuth를 위한 기본 URL을 가져오는 함수
 * NextAuth는 자체 환경 변수를 우선 확인함
 * @returns {string} NextAuth 설정에 맞는 기본 URL
 */
export const getAuthBaseUrl = () => {
  // 이미 NEXTAUTH_URL이 설정되어 있으면 그대로 사용
  if (process.env.NEXTAUTH_URL) {
    const normalizeUrl = (url: string) => {
      return url.endsWith('/') ? url.slice(0, -1) : url;
    };
    return normalizeUrl(process.env.NEXTAUTH_URL);
  }
  
  // 없으면 공통 기본 URL 사용
  return getBaseUrl();
};

// 개발 환경에서 디버깅 정보 출력
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('URL utils initialized with:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    baseUrl: getBaseUrl(),
    authBaseUrl: getAuthBaseUrl()
  });
} 