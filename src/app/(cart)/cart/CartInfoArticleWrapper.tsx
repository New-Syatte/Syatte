"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// 동적으로 CartInfoArticle 임포트하고 SSR 비활성화
const CartInfoArticle = dynamic(
  () => import('./CartInfoArticle'), 
  { ssr: false }
);

// 로딩 중 표시할 플레이스홀더 컴포넌트
const CartInfoPlaceholder = () => (
  <div className="flex flex-col justify-between border border-lightGray h-[200px] w-full p-4 rounded-md animate-pulse">
    <div>
      <div className={"flex justify-between items-center"}>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
    <div className="flex justify-between items-end gap-4 border-t border-lightGray pt-4">
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="flex">
        <div className="h-6 bg-gray-200 rounded w-24 mr-2"></div>
        <div className="h-6 bg-gray-200 rounded w-8"></div>
      </div>
    </div>
  </div>
);

export default function CartInfoArticleWrapper() {
  // 클라이언트 측에서만 렌더링되므로 하이드레이션 이슈 없음
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <CartInfoArticle /> : <CartInfoPlaceholder />;
} 