"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  REMOVE_CHECKED_ITEMS_FROM_CART,
  CALCULATE_CHECKED_ITEMS_QUANTITY,
  CALCULATE_CHECKED_ITEMS_SUBTOTAL,
  SELECT_ALL_ITEMS,
  UNCHECK_ALL_ITEMS,
  ALTERNATE_CHECKED_ITEMS,
  selectAllChecked,
  SAVE_URL,
  selectCartItems,
} from "@/redux/slice/cartSlice";
import { useEffect, useState } from "react";
import Heading from "@/components/heading/Heading";
import priceFormat from "@/utils/priceFormat";
import Button from "@/components/button/Button";
import { CartItem } from "@/type/cart";
import URLS from "@/constants/urls";
import { RxCross2 } from "react-icons/rx";
import { HiMinus, HiPlus } from "react-icons/hi2";
import CartInfoArticle from "./CartInfoArticle";
import CartIcon from "@/assets/cart/cartIcon.svg";

const ICON_CLASS =
  "flex w-4 h-4 text-xs text-white bg-primaryBlue rounded-sm transition-all cursor-pointer hover:text-brand hover:scale-200 mx-1 ";

export default function CartClient() {
  const cartItems = useSelector(selectCartItems);
  const [isClient, setIsClient] = useState(false);
  const isAllChecked = useSelector(selectAllChecked);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const increaseCart = (cart: CartItem) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart: CartItem) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeCart = (cart: CartItem) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const checkout = () => {
    router.push(URLS.CHECKOUT_ADDRESS);
  };
  const altCheck = (id: string) => {
    dispatch(ALTERNATE_CHECKED_ITEMS({ id }));
  };

  const altCheckAll = () => {
    if (isAllChecked) {
      dispatch(UNCHECK_ALL_ITEMS());
    }
    if (!isAllChecked) {
      dispatch(SELECT_ALL_ITEMS());
    }
  };

  useEffect(() => {
    dispatch(CALCULATE_CHECKED_ITEMS_SUBTOTAL());
    dispatch(CALCULATE_CHECKED_ITEMS_QUANTITY());
    dispatch(SAVE_URL(""));

    if (
      cartItems.length === 0 ||
      cartItems.every(item => item.isChecked === false)
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [dispatch, cartItems]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <section className="w-[80%] mx-auto my-24 min-h-[80vh] flex flex-col items-start justify-start">
        <Heading title={"장바구니"} fontSize="6xl" />
        <div className="flex w-full mt-10 gap-20">
          <div className="w-2/3">
            <div className="w-full border-y border-lightGray py-10">
              {cartItems.length !== 0 &&
                cartItems.map(cart => {
                  const { id, name, imageURL, price, cartQuantity } = cart;
                  return (
                    <div
                      className={"flex justify-between items-center px-3 py-3"}
                      key={id}
                    >
                      <input
                        type="checkbox"
                        checked={cart.isChecked}
                        onClick={() => altCheck(id)}
                        className="appearance-none w-5 h-5 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue"
                      />
                      <div className="w-[100px] h-[100px] flex justify-center items-center border border-lightGray">
                        <Image
                          src={imageURL}
                          alt={name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "80%", height: "auto" }}
                        />
                      </div>
                      <div className="w-1/3">
                        <p className={"text-lg text-nomal w-full"}>{name}</p>
                      </div>
                      <div
                        className={"flex justify-between items-center gap-4"}
                      >
                        <HiMinus
                          className={ICON_CLASS}
                          onClick={() => decreaseCart(cart)}
                        />
                        <p className={"text-lg"}>{cartQuantity}</p>
                        <HiPlus
                          className={ICON_CLASS}
                          onClick={() => increaseCart(cart)}
                        />
                      </div>
                      <p className={"text-[22px] font-bold w-1/5 text-right"}>
                        {priceFormat(price * cartQuantity)} 원
                      </p>
                      <div>
                        <button onClick={() => removeCart(cart)}>
                          <RxCross2 className="w-5 h-5 text-lightGray" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              {cartItems.length === 0 && (
                <div className="w-full h-96 flex flex-col justify-center items-center gap-10">
                  <div className="w-1/3 flex justify-center items-center">
                    <Image
                      src={CartIcon}
                      alt="cart icon"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "50%", height: "auto" }}
                    />
                  </div>
                  <p className="text-3xl text-[#dddddd] font-bold">
                    장바구니가 비어 있습니다
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-start items-center gap-2 text-lg font-bold mt-5">
              <input
                type="checkbox"
                id="checkAll"
                checked={isAllChecked}
                onChange={altCheckAll}
                className={
                  cartItems.length === 0
                    ? "cursor-default"
                    : "cursor-pointer" +
                      " appearance-none w-5 h-5 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue"
                }
                disabled={cartItems.length === 0}
              />
              <label
                htmlFor="checkAll"
                className={
                  cartItems.length === 0 ? "cursor-default" : "cursor-pointer"
                }
              >
                전체 선택
              </label>
              <p className="cursor-default">{"|"}</p>
              <button
                onClick={() => dispatch(REMOVE_CHECKED_ITEMS_FROM_CART())}
                disabled={
                  cartItems.length === 0 ||
                  cartItems.every(item => !item.isChecked)
                }
              >
                선택 삭제
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-1/4 gap-5">
            <CartInfoArticle />
            <div className="w-full h-14">
              <Button
                onClick={checkout}
                style="text-xl font-bold"
                disabled={isDisabled}
              >
                주문하기
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  else return <></>;
}
