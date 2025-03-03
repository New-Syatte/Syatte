# Sanity 스키마 TypeScript 정의

## 목차

- [Sanity 스키마 TypeScript 정의](#sanity-스키마-typescript-정의)
  - [목차](#목차)
  - [User 스키마](#user-스키마)
  - [Product 스키마](#product-스키마)
  - [Order 스키마](#order-스키마)
  - [Course 스키마](#course-스키마)
  - [ClassSchema 스키마](#classschema-스키마)
  - [Education Reservation 스키마](#education-reservation-스키마)
  - [Delivery Queue 스키마](#delivery-queue-스키마)
  - [스키마 간 관계](#스키마-간-관계)
  - [데이터 흐름 예시](#데이터-흐름-예시)

## User 스키마

```typescript
interface User {
  _type: "user";
  username: string;
  name: string;
  email: string;
  image: string;
  order: Array<{
    _type: "reference";
    _ref: string; // Order 문서 ID 참조
  }>;
  histories: Array<{
    _type: "reference";
    _ref: string; // Order 문서 ID 참조
  }>;
}
```

## Product 스키마

```typescript
interface Product {
  _type: "product";
  productName: string;
  mainImage: {
    _type: "image";
    asset: {
      _ref: string; // Sanity 이미지 에셋 참조
    };
  };
  description: string;
  images: Array<{
    _type: "image";
    asset: {
      _ref: string;
    };
  }>;
  detailImage: {
    _type: "image";
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  mainCategory: "modernMasters" | "midasMetal";
  subCategory:
    | "decorativePaint"
    | "metalEffect"
    | "metallicPaint"
    | "metallicPlaster"
    | "shimmerstone"
    | "venetianPlaster"
    | "spray"
    | "noneSpray";
  options: Array<{
    color: {
      colorName: string;
      colorCode: string;
    };
    sizes: Array<{
      size: string;
      price: number;
      discount: number;
      stock: number;
    }>;
  }>;
  slug: {
    _type: "slug";
    current: string;
  };
  tags: string[];
  isNewProduct: boolean;
  isBestSeller: boolean;
}
```

## Order 스키마

```typescript
interface Order {
  _type: "order";
  userId: string;
  userEmail: string;
  displayName: string;
  orderDate: string;
  createdAt: string;
  orderAmount: number;
  orderCount: number;
  orderStatus:
    | "preparing"
    | "payed"
    | "ready"
    | "moving"
    | "done"
    | "canceled"
    | "unknown";
  cartItems: Array<{
    product: {
      _type: "reference";
      _ref: string; // Product 문서 ID 참조
    };
    productId: string;
    imageURL: string;
    name: string;
    price: number;
    quantity: number;
    discount: number;
    color: string;
    colorCode: string;
    size: string;
    key: string;
  }>;
  billingAddress: {
    name: string;
    phone: string;
    userEmail: string;
  };
  shippingAddress: {
    name: string;
    postalCode: string;
    city: string;
    line: string;
    phone: string;
    memo: string;
  };
  shippingInfo: {
    carrierId: string;
    trackingNumber: string;
    events: Array<{
      node: {
        description: string;
        status: {
          code: string;
          name: string;
        };
        time: string; // ISO 날짜 형식
      };
    }>;
  };
}
```

## Course 스키마

```typescript
interface Course {
  _type: "course";
  name: string;
  description: Array<{
    _type: "block";
    // Sanity의 포트터블 텍스트 형식
    children: Array<{
      _type: "span";
      text: string;
    }>;
    style: string;
  }>;
  classes: Array<{
    _type: "reference";
    _ref: string; // ClassSchema 문서 ID 참조
  }>;
}
```

## ClassSchema 스키마

```typescript
interface ClassSchema {
  _type: "classSchema";
  name: string;
  category:
    | "applicator_class"
    | "master_class"
    | "plaster_class"
    | "vintage_class"
    | "one_day_class";
  image: {
    _type: "image";
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  detailImage: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  details: Array<{
    _type: "block";
    // Sanity의 포트터블 텍스트 형식
    children: Array<{
      _type: "span";
      text: string;
    }>;
    style: string;
  }>;
  startDate: string; // ISO 날짜 형식
  endDate: string; // ISO 날짜 형식
  schedule: string;
  location: string;
  fee: number;
}
```

## Education Reservation 스키마

```typescript
interface EduReservation {
  _type: "edu-reservation";
  userName: string;
  email: string;
  phone: string;
  company: string;
  class: {
    _type: "reference";
    _ref: string; // ClassSchema 문서 ID 참조
  };
  status: "pending" | "confirmed" | "cancelled";
}
```

## Delivery Queue 스키마

```typescript
interface DeliveryQueue {
  _type: "deliveryQueue";
  carrierId: string;
  trackingNumber: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string; // ISO 날짜 형식
  processedAt?: string; // ISO 날짜 형식
  retryCount: number;
  order: {
    _type: "reference";
    _ref: string; // Order 문서 ID 참조
  };
}
```

## 스키마 간 관계

- **User와 Order**: User는 여러 개의 Order를 가질 수 있습니다 (1:N 관계).
- **Order와 Product**: Order는 여러 개의 Product를 참조할 수 있습니다 (N:M 관계).
- **Course와 ClassSchema**: Course는 여러 개의 ClassSchema를 참조할 수 있습니다 (1:N 관계).
- **EduReservation과 ClassSchema**: EduReservation은 하나의 ClassSchema를 참조합니다 (N:1 관계).
- **DeliveryQueue와 Order**: DeliveryQueue는 하나의 Order를 참조합니다 (N:1 관계).

이 구조를 통해 교육 과정과 클래스, 예약 및 상품 관리, 주문 처리, 배송 시스템이 통합적으로 관리됩니다.

## 데이터 흐름 예시

1. **교육 과정 관리**:

   - Course 문서 생성 → ClassSchema 문서들 연결 → EduReservation으로 예약 접수

2. **상품 주문 처리**:

   - User가 Product 선택 → Order 생성 → DeliveryQueue에 배송 정보 등록 → 배송 상태 추적

3. **사용자 이력 관리**:
   - User 문서에 Order 참조 저장 → 사용자별 주문 이력 조회 가능
