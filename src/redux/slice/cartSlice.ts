import { CartItem } from "@/type/cart";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDiscountPrice } from "@/utils/getDiscount";

interface ICartState {
  cartItems: CartItem[];
  cartTotalAmount: number;
  cartCheckedTotalAmount: number;
  isAllChecked: boolean;
  previousURL: string;
}

const initialState: ICartState = {
  cartItems:
    typeof window !== "undefined"
      ? localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")!)
        : []
      : [],
  cartTotalAmount:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("cartTotalAmount")) || 0
      : 0,
  cartCheckedTotalAmount:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("cartCheckedTotalAmount")) || 0
      : 0,
  isAllChecked:
    typeof window !== "undefined"
      ? localStorage.getItem("isAllChecked") === "true"
      : false,
  previousURL: "",
};

const calculateTotalAmount = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    const { price, quantity, discount } = item;
    const discountedPrice = getDiscountPrice(price, discount);
    return total + discountedPrice * quantity;
  }, 0);
};

const calculateCheckedTotalAmount = (items: CartItem[]) => {
  return items
    .filter(item => item.isChecked)
    .reduce((total, item) => {
      const { price, quantity, discount } = item;
      const discountedPrice = getDiscountPrice(price, discount);
      return total + discountedPrice * quantity;
    }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.key === action.payload.key,
      );

      const increaseCount = action.payload.quantity
        ? action.payload.quantity
        : 1;

      if (productIndex >= 0) {
        state.cartItems[productIndex].quantity += increaseCount;
      } else {
        const tempProduct: CartItem = {
          productId: action.payload.id,
          imageURL: action.payload.imageURL,
          name: action.payload.name,
          price: action.payload.price,
          quantity: increaseCount,
          discount: action.payload.discount,
          isChecked: true,
          size: action.payload.size,
          color: action.payload.color,
          colorCode: action.payload.colorCode,
          key: action.payload.key,
        };

        state.cartItems.push(tempProduct);
      }

      // 금액 자동 계산
      state.cartTotalAmount = calculateTotalAmount(state.cartItems);
      state.cartCheckedTotalAmount = calculateCheckedTotalAmount(
        state.cartItems,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount.toString());
      localStorage.setItem(
        "cartCheckedTotalAmount",
        state.cartCheckedTotalAmount.toString(),
      );
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.key === action.payload.key,
      );

      if (state.cartItems[productIndex].quantity > 1) {
        state.cartItems[productIndex].quantity -= 1;
      } else if (state.cartItems[productIndex].quantity === 1) {
        const newCartItem = state.cartItems.filter(
          item => item.key !== action.payload.key,
        );
        state.cartItems = newCartItem;
      }

      // 금액 자동 계산
      state.cartTotalAmount = calculateTotalAmount(state.cartItems);
      state.cartCheckedTotalAmount = calculateCheckedTotalAmount(
        state.cartItems,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount.toString());
      localStorage.setItem(
        "cartCheckedTotalAmount",
        state.cartCheckedTotalAmount.toString(),
      );
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItem = state.cartItems.filter(
        item => item.key !== action.payload.key,
      );

      state.cartItems = newCartItem;

      // 금액 자동 계산
      state.cartTotalAmount = calculateTotalAmount(state.cartItems);
      state.cartCheckedTotalAmount = calculateCheckedTotalAmount(
        state.cartItems,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount.toString());
      localStorage.setItem(
        "cartCheckedTotalAmount",
        state.cartCheckedTotalAmount.toString(),
      );
    },

    ALTERNATE_CHECKED_ITEMS: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.key === action.payload.key,
      );
      state.cartItems[productIndex].isChecked =
        !state.cartItems[productIndex].isChecked;

      // 금액 자동 계산
      state.cartTotalAmount = calculateTotalAmount(state.cartItems);
      state.cartCheckedTotalAmount = calculateCheckedTotalAmount(
        state.cartItems,
      );

      state.isAllChecked = state.cartItems.every(item => item.isChecked);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount.toString());
      localStorage.setItem(
        "cartCheckedTotalAmount",
        state.cartCheckedTotalAmount.toString(),
      );
      localStorage.setItem("isAllChecked", state.isAllChecked.toString());
    },

    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },

    REMOVE_CHECKED_ITEMS_FROM_CART: state => {
      const newCartItem = state.cartItems.filter(item => !item.isChecked);
      state.cartItems = newCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    SELECT_ALL_ITEMS: state => {
      state.cartItems.map(item => {
        item.isChecked = true;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.isAllChecked = true;
    },

    UNCHECK_ALL_ITEMS: state => {
      state.cartItems.map(item => {
        item.isChecked = false;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.isAllChecked = false;
    },

    CALCULATE_CHECKED_ITEMS_SUBTOTAL: state => {
      const array: number[] = [];

      state.cartItems
        .filter(item => item.isChecked)
        .map(item => {
          const { price, quantity, discount } = item;
          const discountedPrice = getDiscountPrice(price, discount);
          const cartItemAmount = discountedPrice * quantity;
          return array.push(cartItemAmount);
        });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartCheckedTotalAmount = totalAmount;
    },
  },
});

export const {
  ADD_TO_CART,
  REMOVE_CHECKED_ITEMS_FROM_CART,
  SELECT_ALL_ITEMS,
  UNCHECK_ALL_ITEMS,
  REMOVE_FROM_CART,
  DECREASE_CART,
  CALCULATE_CHECKED_ITEMS_SUBTOTAL,
  SAVE_URL,
  ALTERNATE_CHECKED_ITEMS,
} = cartSlice.actions;

// 기본 셀렉터
export const selectCartItems = (state: RootState) => state.cart.cartItems;

// 메모이제이션된 셀렉터
export const selectCheckedCartItems = createSelector(
  [selectCartItems],
  cartItems => cartItems.filter(item => item.isChecked),
);

export const selectCheckedTotalQuantity = createSelector(
  [selectCheckedCartItems],
  cartItems => cartItems.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;

export const selectCheckedTotalAmount = (state: RootState) =>
  state.cart.cartCheckedTotalAmount;

export const selectAllChecked = (state: RootState) => state.cart.isAllChecked;

export default cartSlice.reducer;
