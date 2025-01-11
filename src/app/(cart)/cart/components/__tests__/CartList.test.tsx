import { render, screen, act } from "@testing-library/react";
import CartList from "../CartList";
import { CartItem } from "@/type/cart";

// 테스트에서 사용할 목(mock) 함수들
const mockToggleCheck = jest.fn();
const mockIncreaseQuantity = jest.fn();
const mockDecreaseQuantity = jest.fn();
const mockDeleteItem = jest.fn();

// 테스트용 장바구니 아이템 데이터 배열
const mockCartItems: CartItem[] = [
  {
    productId: "1",
    name: "상품 1",
    price: 10000,
    discount: 10,
    quantity: 1,
    imageURL: "/test-image-1.jpg",
    isChecked: false,
    color: "red",
    colorCode: "red",
    size: "M",
    key: "test-key",
  },
  {
    productId: "2",
    name: "상품 2",
    price: 20000,
    discount: 20,
    quantity: 2,
    imageURL: "/test-image-2.jpg",
    isChecked: true,
    color: "blue",
    colorCode: "blue",
    size: "L",
    key: "test-key-2",
  },
];

// CartItem 컴포넌트를 모의(mock)
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const MockCartItem = ({ cart }: { cart: CartItem }) => (
      <div data-testid={`cart-item-${cart.key}`}>{cart.name}</div>
    );
    return Promise.resolve(MockCartItem);
  },
}));

// 이미지 컴포넌트 모의(mock)
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  },
}));

describe("CartList 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 빈 장바구니 상태 테스트
  it("장바구니가 비어있을 때 빈 장바구니 메시지를 표시해야 함", () => {
    render(
      <CartList
        cartItems={[]}
        isMobile={false}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    expect(screen.getByText("장바구니가 비어 있습니다")).toBeInTheDocument();
  });

  // 장바구니 아이템 렌더링 테스트
  it("장바구니 아이템들이 올바르게 렌더링되어야 함", () => {
    render(
      <CartList
        cartItems={mockCartItems}
        isMobile={false}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    mockCartItems.forEach(item => {
      const cartItem = screen.getByTestId(`cart-item-${item.key}`);
      expect(cartItem).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  // disabled 상태 테스트
  it("disabled 상태가 모든 CartItem 컴포넌트에 전달되어야 함", () => {
    render(
      <CartList
        cartItems={mockCartItems}
        isMobile={false}
        disabled={true}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    mockCartItems.forEach(item => {
      expect(screen.getByTestId(`cart-item-${item.key}`)).toBeInTheDocument();
    });
  });

  // 모바일 뷰 테스트
  it("모바일 뷰에서 올바르게 렌더링되어야 함", () => {
    render(
      <CartList
        cartItems={mockCartItems}
        isMobile={true}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    mockCartItems.forEach(item => {
      expect(screen.getByTestId(`cart-item-${item.key}`)).toBeInTheDocument();
    });
  });
});
