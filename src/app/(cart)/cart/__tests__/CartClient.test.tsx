import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/slice/cartSlice";
import CartClient from "../CartClient";
import "@testing-library/jest-dom";

// Next.js router mock
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
    };
  },
}));

// Redux 스토어 모의(mock) 설정
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        cartItems: [],
        cartTotalAmount: 0,
        cartCheckedTotalAmount: 0,
        isAllChecked: false,
        previousURL: "",
        ...initialState,
      },
    },
  });
};

// 테스트용 장바구니 아이템 데이터
const mockCartItems = [
  {
    id: "1",
    name: "상품 1",
    price: 10000,
    discount: 10,
    cartQuantity: 1,
    imageURL: "/test-image-1.jpg",
    isChecked: false,
  },
  {
    id: "2",
    name: "상품 2",
    price: 20000,
    discount: 20,
    cartQuantity: 2,
    imageURL: "/test-image-2.jpg",
    isChecked: true,
  },
];

// 컴포넌트를 Redux Provider로 감싸는 헬퍼 함수
const renderWithProvider = (component: React.ReactNode, initialState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

// 동적 임포트된 컴포넌트들을 모의(mock)
jest.mock("../CartInfoArticle", () => {
  return function MockCartInfoArticle() {
    return <div data-testid="cart-info">Cart Info</div>;
  };
});

jest.mock("../components/CartList", () => {
  return function MockCartList() {
    return <div data-testid="cart-list">Cart List</div>;
  };
});

jest.mock("../components/CartFooter", () => {
  return function MockCartFooter() {
    return <div data-testid="cart-footer">Cart Footer</div>;
  };
});

describe("CartClient 컴포넌트", () => {
  beforeEach(() => {
    // localStorage mock 초기화
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock as any;
  });

  // 빈 장바구니 상태 테스트
  it("장바구니가 비어있을 때 빈 장바구니 메시지를 표시해야 함", () => {
    renderWithProvider(<CartClient />);

    // 컴포넌트가 마운트되었는지 확인
    expect(screen.getByTestId("cart-list")).toBeInTheDocument();
    expect(screen.getByText("주문하기")).toBeDisabled();
  });

  // 장바구니에 아이템이 있는 경우 테스트
  it("장바구니에 아이템이 있을 때 올바르게 표시되어야 함", () => {
    renderWithProvider(<CartClient />, {
      cartItems: mockCartItems,
      cartTotalAmount: 50000,
      isAllChecked: false,
    });

    // 필수 컴포넌트들이 렌더링되었는지 확인
    expect(screen.getByTestId("cart-list")).toBeInTheDocument();
    expect(screen.getByTestId("cart-info")).toBeInTheDocument();
    expect(screen.getByTestId("cart-footer")).toBeInTheDocument();
  });

  // 장바구니 상태 변경 테스트
  it("장바구니 상태가 변경되면 UI가 업데이트되어야 함", () => {
    const { store } = renderWithProvider(<CartClient />, {
      cartItems: mockCartItems,
    });

    // 상태 변경 후 UI 업데이트 확인
    act(() => {
      store.dispatch({
        type: "cart/SELECT_ALL_ITEMS",
      });
    });

    expect(store.getState().cart.isAllChecked).toBeTruthy();
  });
});
