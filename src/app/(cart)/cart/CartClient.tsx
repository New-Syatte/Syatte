"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  ALTERNATE_CHECKED_ITEMS,
  SELECT_ALL_ITEMS,
  UNCHECK_ALL_ITEMS,
  selectCartItems,
  selectAllChecked,
} from "@/redux/slice/cartSlice";
import { useEffect, useState, useTransition, Suspense } from "react";
import dynamic from "next/dynamic";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import URLS from "@/constants/urls";
import { Mobile } from "@/hooks/useMediaQuery";
import { CartItem } from "@/type/cart";
import { toast } from "react-toastify";

// 동적 임포트로 컴포넌트 로드
const CartInfoArticle = dynamic(() => import("./CartInfoArticle"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-[200px] w-full rounded" />
  ),
  ssr: false,
});

const CartList = dynamic(() => import("./components/CartList"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-[400px] w-full rounded" />
  ),
});

const CartFooter = dynamic(() => import("./components/CartFooter"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-[50px] w-full rounded" />
  ),
});

// 로딩 컴포넌트
const LoadingFallback = () => (
  <div className="w-full h-[80vh] flex justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryBlue"></div>
  </div>
);

export default function CartClient() {
  const cartItems = useSelector(selectCartItems);
  const isAllChecked = useSelector(selectAllChecked);
  const [isDisabled, setIsDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMobile = Mobile();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsDisabled(
      cartItems.length === 0 || cartItems.every(item => !item.isChecked),
    );
  }, [cartItems]);

  const handleCartAction = (action: () => void, errorMessage: string) => {
    startTransition(() => {
      try {
        action();
      } catch (error) {
        console.error("Cart action failed:", error);
        toast.error(error instanceof Error ? error.message : errorMessage);
      }
    });
  };

  const handleToggleCheck = (key: string) => {
    handleCartAction(
      () => dispatch(ALTERNATE_CHECKED_ITEMS({ key })),
      "상품 선택 상태 변경에 실패했습니다.",
    );
  };

  const handleToggleCheckAll = () => {
    handleCartAction(() => {
      if (isAllChecked) {
        dispatch(UNCHECK_ALL_ITEMS());
      } else {
        dispatch(SELECT_ALL_ITEMS());
      }
    }, "전체 선택 상태 변경에 실패했습니다.");
  };

  const handleIncreaseQuantity = (cart: CartItem) => {
    handleCartAction(
      () => dispatch(ADD_TO_CART({ ...cart, quantity: 1 })),
      "수량 증가에 실패했습니다.",
    );
  };

  const handleDecreaseQuantity = (cart: CartItem) => {
    handleCartAction(
      () => dispatch(DECREASE_CART(cart)),
      "수량 감소에 실패했습니다.",
    );
  };

  const handleDeleteItem = (cart: CartItem) => {
    handleCartAction(
      () => dispatch(REMOVE_FROM_CART(cart)),
      "상품 삭제에 실패했습니다.",
    );
  };

  const handleDeleteCheckedItems = () => {
    handleCartAction(() => {
      const checkedItems = cartItems.filter(item => item.isChecked);
      checkedItems.forEach(item => dispatch(REMOVE_FROM_CART(item)));
    }, "선택한 상품 삭제에 실패했습니다.");
  };

  if (!mounted) {
    return <LoadingFallback />;
  }

  return (
    <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
      <div className="w-full flex flex-col items-start justify-start pb-16 sm:pt-24">
        <Heading
          title={"장바구니"}
          center={isMobile}
          fontSize="6xl sm:text-3xl"
        />
        <div className="flex sm:flex-col sm:justify-center sm:items-center w-full mt-10 gap-20">
          <div className="w-2/3 sm:w-[90%]">
            <div className="w-full border-y border-lightGray py-10">
              <Suspense fallback={<LoadingFallback />}>
                <CartList
                  cartItems={cartItems}
                  isMobile={isMobile}
                  onToggleCheck={handleToggleCheck}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                  onDeleteItem={handleDeleteItem}
                  disabled={isPending}
                />
              </Suspense>
            </div>
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-[50px] w-full rounded" />
              }
            >
              <CartFooter
                cartItems={cartItems}
                isAllChecked={isAllChecked}
                onToggleCheckAll={handleToggleCheckAll}
                onDeleteCheckedItems={handleDeleteCheckedItems}
                disabled={isPending}
              />
            </Suspense>
          </div>
          <div className="flex flex-col justify-start items-start w-1/4 sm:w-[90%] gap-5">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-[200px] w-full rounded" />
              }
            >
              <CartInfoArticle />
            </Suspense>
            <div className="w-full h-14">
              <Button
                onClick={() => router.push(URLS.CHECKOUT_ADDRESS)}
                style="text-xl font-bold"
                disabled={isDisabled || isPending}
              >
                {isPending ? "처리중..." : "주문하기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
