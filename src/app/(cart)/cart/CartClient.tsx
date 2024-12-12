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
  CALCULATE_SUBTOTAL,
  CALCULATE_CHECKED_ITEMS_SUBTOTAL,
  selectCartItems,
  selectCheckedCartItems,
  selectAllChecked,
} from "@/redux/slice/cartSlice";
import { useEffect, useState } from "react";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import URLS from "@/constants/urls";
import { Mobile } from "@/hooks/useMediaQuery";
import CartInfoArticle from "./CartInfoArticle";
import CartList from "./components/CartList";
import CartFooter from "./components/CartFooter";
import { CartItem } from "@/type/cart";

export default function CartClient() {
  const cartItems = useSelector(selectCartItems);
  const checkedItems = useSelector(selectCheckedCartItems);
  const isAllChecked = useSelector(selectAllChecked);
  const [isDisabled, setIsDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = Mobile();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_CHECKED_ITEMS_SUBTOTAL());
  }, [dispatch, cartItems]);

  useEffect(() => {
    if (cartItems.length === 0 || cartItems.every(item => !item.isChecked)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [cartItems]);

  const handleToggleCheck = (id: string) => {
    dispatch(ALTERNATE_CHECKED_ITEMS({ id }));
  };

  const handleToggleCheckAll = () => {
    if (isAllChecked) {
      dispatch(UNCHECK_ALL_ITEMS());
    } else {
      dispatch(SELECT_ALL_ITEMS());
    }
  };

  const handleIncreaseQuantity = (cart: CartItem) => {
    dispatch(ADD_TO_CART({ ...cart, quantity: 1 }));
  };

  const handleDecreaseQuantity = (cart: CartItem) => {
    dispatch(DECREASE_CART(cart));
  };

  const handleDeleteItem = (cart: CartItem) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const handleDeleteCheckedItems = () => {
    const checkedItems = cartItems.filter(item => item.isChecked);
    checkedItems.forEach(item => handleDeleteItem(item));
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
      <div className="w-full flex flex-col items-start justify-start py-16 pt-24">
        <Heading
          title={"장바구니"}
          center={isMobile}
          fontSize="6xl sm:text-3xl"
        />
        <div className="flex sm:flex-col sm:justify-center sm:items-center w-full mt-10 gap-20">
          <div className="w-2/3 sm:w-[90%]">
            <div className="w-full border-y border-lightGray py-10">
              <CartList
                cartItems={cartItems}
                isMobile={isMobile}
                onToggleCheck={handleToggleCheck}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                onDeleteItem={handleDeleteItem}
              />
            </div>
            <CartFooter
              cartItems={cartItems}
              isAllChecked={isAllChecked}
              onToggleCheckAll={handleToggleCheckAll}
              onDeleteCheckedItems={handleDeleteCheckedItems}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-1/4 sm:w-[90%] gap-5">
            <CartInfoArticle />
            <div className="w-full h-14">
              <Button
                onClick={() => router.push(URLS.CHECKOUT_ADDRESS)}
                style="text-xl font-bold"
                disabled={isDisabled}
              >
                주문하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
