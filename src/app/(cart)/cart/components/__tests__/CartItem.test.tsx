import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../CartItem";
import { CartItem as CartItemType } from "@/type/cart";

// 테스트에서 사용할 목(mock) 함수들
const mockToggleCheck = jest.fn();
const mockIncreaseQuantity = jest.fn();
const mockDecreaseQuantity = jest.fn();
const mockDeleteItem = jest.fn();

// 테스트에서 사용할 샘플 장바구니 아이템 데이터
const mockCartItem: CartItemType = {
  productId: "test-id",
  name: "테스트 상품",
  price: 10000,
  discount: 10,
  quantity: 1,
  imageURL: "/test-image.jpg",
  isChecked: false,
  color: "red",
  colorCode: "red",
  size: "M",
  key: "test-key",
};

// 이미지 컴포넌트 모의(mock)
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  },
}));

// 아이콘 컴포넌트 모의(mock)
jest.mock("react-icons/hi2", () => ({
  HiMinus: () => <span>-</span>,
  HiPlus: () => <span>+</span>,
}));

jest.mock("react-icons/rx", () => ({
  RxCross2: () => <span>×</span>,
}));

describe("CartItem 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 컴포넌트가 올바르게 렌더링되는지 테스트
  it("상품 정보가 올바르게 표시되어야 함", () => {
    render(
      <CartItem
        cart={mockCartItem}
        isMobile={false}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    // 상품명이 올바르게 표시되는지 확인
    expect(screen.getByText("테스트 상품")).toBeInTheDocument();

    // 할인된 가격이 올바르게 표시되는지 확인 (10000원의 10% 할인 = 9000원)
    expect(screen.getByText("9,000 원")).toBeInTheDocument();
  });

  // 체크박스 기능 테스트
  it("체크박스 클릭 시 onToggleCheck가 호출되어야 함", () => {
    render(
      <CartItem
        cart={mockCartItem}
        isMobile={false}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleCheck).toHaveBeenCalledTimes(1);
    expect(mockToggleCheck).toHaveBeenCalledWith("test-id");
  });

  // 수량 조절 버튼 테스트
  it("수량 증가/감소 버튼이 올바르게 작동해야 함", () => {
    render(
      <CartItem
        cart={mockCartItem}
        isMobile={false}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    const increaseButton = screen.getByLabelText("수량 증가");
    fireEvent.click(increaseButton);
    expect(mockIncreaseQuantity).toHaveBeenCalledTimes(1);
    expect(mockIncreaseQuantity).toHaveBeenCalledWith(mockCartItem);

    const decreaseButton = screen.getByLabelText("수량 감소");
    fireEvent.click(decreaseButton);
    expect(mockDecreaseQuantity).toHaveBeenCalledTimes(1);
    expect(mockDecreaseQuantity).toHaveBeenCalledWith(mockCartItem);
  });

  // disabled 상태 테스트
  it("disabled 상태일 때 모든 상호작용 비활성화되어야 함", () => {
    render(
      <CartItem
        cart={mockCartItem}
        isMobile={false}
        disabled={true}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(screen.getByLabelText("수량 증가")).toBeDisabled();
    expect(screen.getByLabelText("수량 감소")).toBeDisabled();
    expect(screen.getByLabelText("상품 삭제")).toBeDisabled();

    fireEvent.click(screen.getByLabelText("수량 증가"));
    expect(mockIncreaseQuantity).not.toHaveBeenCalled();
  });

  // 모바일 뷰 테스트
  it("모바일 뷰에서 올바르게 렌더링되어야 함", () => {
    render(
      <CartItem
        cart={mockCartItem}
        isMobile={true}
        onToggleCheck={mockToggleCheck}
        onIncreaseQuantity={mockIncreaseQuantity}
        onDecreaseQuantity={mockDecreaseQuantity}
        onDeleteItem={mockDeleteItem}
      />,
    );

    // 모바일 뷰에서의 레이아웃 확인
    const productNameContainer = screen.getByText("테스트 상품").closest("div");
    expect(productNameContainer).toHaveClass("w-1/3");

    // 모바일 뷰에서의 텍스트 크기 확인
    const productName = screen.getByText("테스트 상품");
    expect(productName).toHaveClass("text-sm");
  });
});
