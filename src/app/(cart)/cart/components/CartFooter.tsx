"use client";

import { CartItem } from "@/type/cart";
import { memo, useMemo } from "react";

interface CartFooterProps {
  cartItems: CartItem[];
  isAllChecked: boolean;
  disabled?: boolean;
  onToggleCheckAll: () => void;
  onDeleteCheckedItems: () => void;
}

function CartFooter({
  cartItems,
  isAllChecked,
  disabled = false,
  onToggleCheckAll,
  onDeleteCheckedItems,
}: CartFooterProps) {
  const { hasItems, hasCheckedItems } = useMemo(
    () => ({
      hasItems: cartItems.length > 0,
      hasCheckedItems: cartItems.some(item => item.isChecked),
    }),
    [cartItems],
  );

  return (
    <div className="flex justify-start items-center gap-2 text-lg font-bold mt-5">
      <input
        type="checkbox"
        id="checkAll"
        checked={isAllChecked}
        onChange={onToggleCheckAll}
        disabled={!hasItems || disabled}
        className={`appearance-none w-5 h-5 sm:w-4 sm:h-4 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed ${
          hasItems ? "cursor-pointer" : "cursor-default"
        }`}
      />
      <label
        htmlFor="checkAll"
        className={hasItems && !disabled ? "cursor-pointer" : "cursor-default"}
      >
        전체 선택
      </label>
      <p className="cursor-default">|</p>
      <button
        onClick={onDeleteCheckedItems}
        disabled={!hasCheckedItems || disabled}
        className="disabled:opacity-50 disabled:cursor-not-allowed hover:text-primaryBlue transition-colors"
      >
        선택 삭제
      </button>
    </div>
  );
}

export default memo(CartFooter);
