"use client";
import { useSelector } from "react-redux";
import {
  selectCheckedTotalAmount,
  selectCheckedTotalQuantity,
} from "@/redux/slice/cartSlice";
import deliveryFee from "@/constants/deliveryFee";
import priceFormat from "@/utils/priceFormat";

const CartInfoArticle = () => {
  const cartTotalAmount = useSelector(selectCheckedTotalAmount);
  const cartTotalQuantity = useSelector(selectCheckedTotalQuantity);
  return (
    <div className="flex flex-col justify-between border border-lightGray h-[200px] w-full p-4 rounded-md">
      <div>
        <div className={"flex justify-between items-center"}>
          <p className={"text-[22px] font-bold"}>전체 상품 개수</p>
          <p className={"text-[22px]"}>{cartTotalQuantity} 개</p>
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
          <p>{priceFormat(cartTotalAmount)}</p>
          <p className="text-lg">원</p>
        </div>
      </div>
    </div>
  );
};

export default CartInfoArticle;
