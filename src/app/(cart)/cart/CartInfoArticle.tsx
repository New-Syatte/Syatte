"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCheckedTotalAmount,
  CALCULATE_CHECKED_ITEMS_SUBTOTAL,
} from "@/redux/slice/cartSlice";
import deliveryFee from "@/constants/deliveryFee";
import priceFormat from "@/utils/priceFormat";
import { useEffect, useState } from "react";

const CartInfoArticle = () => {
  const cartItems = useSelector(selectCartItems);
  const checkedTotalAmount = useSelector(selectCheckedTotalAmount);
  const dispatch = useDispatch();
  
  // 클라이언트 측에서만 계산할 상태 추가
  const [checkedItemsQuantity, setCheckedItemsQuantity] = useState(0);
  const [formattedTotal, setFormattedTotal] = useState('0');

  useEffect(() => {
    dispatch(CALCULATE_CHECKED_ITEMS_SUBTOTAL());
    
    // 클라이언트 측에서 계산
    const quantity = cartItems
      .filter(item => item.isChecked)
      .reduce((total, item) => total + item.quantity, 0);
    setCheckedItemsQuantity(quantity);
    
    // 가격 형식도 클라이언트에서만 계산
    setFormattedTotal(priceFormat(checkedTotalAmount));
  }, [cartItems, dispatch, checkedTotalAmount]);

  return (
    <div className="flex flex-col justify-between border border-lightGray h-[200px] w-full p-4 rounded-md">
      <div>
        <div className={"flex justify-between items-center"}>
          <p className={"text-[22px] font-bold"}>전체 상품 개수</p>
          <p className={"text-[22px]"}>{checkedItemsQuantity} 개</p>
        </div>
        <div className="flex justify-between items-center">
          <p className={"text-[22px] font-bold"}>배송비</p>
          <p className={"text-[22px]"}>{deliveryFee} 원</p>
        </div>
      </div>
      <div
        className={
          "flex justify-between items-end gap-4 border-t border-lightGray pt-4"
        }
      >
        <h4 className={"font-bold text-[22px]"}>총 결제금액</h4>
        <div className={"font-bold text-2xl flex justify-start items-end"}>
          <p>{formattedTotal}</p>
          <p className="text-lg">원</p>
        </div>
      </div>
    </div>
  );
};

export default CartInfoArticle;
