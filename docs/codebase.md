# Syatt 프로젝트 코드베이스 문서

## 1. 프로젝트 개요

Syatt는 Next.js 15.1.6 버전을 기반으로 구축된 특수 페인팅 관련 웹 애플리케이션입니다. 이 프로젝트는 제품 전시, 브랜드 소개, 교육 정보 제공, 그리고 결제 시스템을 포함한 전자상거래 기능을 제공합니다.

## 2. 기술 스택

### 프레임워크 및 라이브러리

- **프론트엔드**: Next.js 15.1.6, React 18.2.0
- **상태 관리**: Redux Toolkit
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **데이터 관리**: Sanity CMS
- **인증**: Next-Auth
- **결제 시스템**: 토스페이먼츠
- **UI 컴포넌트**: React Slick, Swiper, React Datepicker 등
- **테스트**: Jest, React Testing Library

## 3. 프로젝트 구조

### 핵심 디렉토리

- `src/app`: Next.js의 App Router 구현 (페이지 및 API 라우트)
- `src/components`: 재사용 가능한 UI 컴포넌트
- `src/redux`: Redux 상태 관리 관련 코드
- `src/services`: 외부 API 통신 로직
- `src/utils`: 유틸리티 함수
- `src/hooks`: 커스텀 React 훅
- `src/constants`: 상수 값
- `src/type`: TypeScript 타입 정의
- `src/layouts`: 레이아웃 컴포넌트
- `src/assets`: 정적 자산 (이미지 등)

### 주요 라우트 구조

- **(home)**: 메인 페이지
- **(product)**: 제품 관련 페이지
- **(brand)**: 브랜드 관련 페이지
- **(education)**: 교육 관련 페이지
- **(cart)**: 장바구니 페이지
- **(checkout)**: 결제 페이지
- **(order)**: 주문 관련 페이지
- **(auth)**: 인증 관련 페이지
- **api/**: 백엔드 API 엔드포인트

## 4. 핵심 기능

### 인증 시스템

- Next-Auth를 사용한 사용자 인증
- 미들웨어를 통한 보호된 라우트 관리
- JWT 토큰 기반의 인증 처리

### 제품 및 브랜드 관리

- Sanity CMS와의 통합을 통한 컨텐츠 관리
- 제품 목록 및 상세 정보 표시
- 브랜드 정보 및 제품 카테고리 관리

### 쇼핑 및 결제

- 장바구니 기능 (Redux를 통한 상태 관리)
- 결제 프로세스 (토스페이먼츠 연동)
- 주문 내역 관리 및 조회

### 반응형 디자인

- Tailwind CSS를 활용한 모바일 및 데스크톱 대응
- 브레이크포인트 기반 레이아웃 조정
- 디바이스 최적화된 이미지 로딩

### 성능 최적화

- Next.js의 서버 컴포넌트 및 스트리밍 활용
- 데이터 캐싱 및 revalidate 전략
- Vercel 분석 및 속도 인사이트 통합

## 5. 주요 컴포넌트

### UI 컴포넌트

- **Button**: 다양한 스타일의 버튼 컴포넌트
- **Card**: 제품 및 정보 표시용 카드 컴포넌트
- **Slider**: 이미지 및 컨텐츠 슬라이더
- **CustomSelect**: 커스텀 셀렉트 박스
- **DatePicker**: 날짜 선택 컴포넌트
- **Loader**: 로딩 인디케이터
- **Pagination**: 페이지네이션 컴포넌트

### 레이아웃 컴포넌트

- **Header**: 네비게이션 및 상단 메뉴
- **Footer**: 하단 정보 및 링크
- **RootLayout**: 전체 애플리케이션 레이아웃

### 기능별 컴포넌트

- **CheckoutForm**: 결제 정보 입력 폼
- **ProductInfoList**: 제품 정보 표시
- **OrderComponents**: 주문 관련 컴포넌트
- **LoginComponents**: 로그인 관련 컴포넌트

## 6. 상태 관리

Redux Toolkit을 사용하여 다음과 같은 상태를 관리합니다:

- 장바구니 상태
- 사용자 정보 상태
- UI 상태 (모달, 알림 등)
- 비동기 작업 상태 (로딩, 에러 등)

`createSlice`와 `createAsyncThunk`를 통해 상태 변경 및 비동기 작업을 처리합니다.

## 7. API 통합

### Sanity CMS

- 제품, 브랜드, 교육 컨텐츠 등의 데이터 관리
- GROQ 쿼리를 통한 데이터 조회
- 이미지 최적화 및 변환

### 결제 시스템

- 토스페이먼츠 SDK 연동
- 결제 위젯 및 결제 처리 API 활용
- 결제 검증 및 주문 처리

### 사용자 인증

- Next-Auth를 통한 다양한 인증 방식 지원
- JWT 토큰 관리 및 세션 유지

## 8. 성능 및 최적화

- Next.js Image 컴포넌트를 통한 이미지 최적화
- 데이터 캐싱 전략 (일반적으로 24시간, 중요 데이터는 요청 시 갱신)
- 코드 스플리팅 및 지연 로딩
- Vercel 배포 환경에서의 성능 모니터링

## 9. 테스트

Jest와 React Testing Library를 사용하여 다음 영역의 테스트를 구현:

- 컴포넌트 단위 테스트
- 상태 관리 로직 테스트
- 통합 테스트

## 10. 배포 및 환경 설정

- Vercel을 통한 배포
- 환경 변수 관리 (.env.local)
- 배포 설정 (vercel.json)
- CI/CD 파이프라인 (GitHub Actions)
