"use client";

import { CartItem } from "@/type/cart";

interface CartFooterProps {
  cartItems: CartItem[];
  isAllChecked: boolean;
  onToggleCheckAll: () => void;
  onDeleteCheckedItems: () => void;
}

export default function CartFooter({
  cartItems,
  isAllChecked,
  onToggleCheckAll,
  onDeleteCheckedItems,
}: CartFooterProps) {
  return (
    <div className="flex justify-start items-center gap-2 text-lg font-bold mt-5">
      <input
        type="checkbox"
        id="checkAll"
        checked={isAllChecked}
        onChange={onToggleCheckAll}
        className={
          cartItems.length === 0
            ? "cursor-default"
            : "cursor-pointer appearance-none w-5 h-5 sm:w-4 sm:h-4 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue"
        }
        disabled={cartItems.length === 0}
      />
      <label
        htmlFor="checkAll"
        className={cartItems.length === 0 ? "cursor-default" : "cursor-pointer"}
      >
        전체 선택
      </label>
      <p className="cursor-default">{"|"}</p>
      <button
        onClick={onDeleteCheckedItems}
        disabled={
          cartItems.length === 0 || cartItems.every(item => !item.isChecked)
        }
      >
        선택 삭제
      </button>
    </div>
  );
}
