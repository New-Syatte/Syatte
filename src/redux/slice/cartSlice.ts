import { CartItem } from "@/type/cart";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  cartTotalAmount: 0,
  cartCheckedTotalAmount: 0,
  isAllChecked: false,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );

      const increaseCount = action.payload.quantity
        ? action.payload.quantity
        : 1;

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += increaseCount;
      } else {
        const tempProduct = {
          id: action.payload.id,
          imageURL: action.payload.imageURL,
          name: action.payload.name,
          price: action.payload.price,
          cartQuantity: increaseCount,
          discount: action.payload.discount,
          isChecked: true,
          _key: action.payload.id,
        };

        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_SUBTOTAL: state => {
      const array: number[] = [];
      state.cartItems.map(item => {
        const { price, cartQuantity, discount } = item;
        const discountedPrice = price - price * (discount / 100);
        const cartItemAmount = discountedPrice * cartQuantity;
        return array.push(cartItemAmount);
      });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalAmount = totalAmount;
    },

    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          item => item.id !== action.payload.id,
        );
        state.cartItems = newCartItem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItem = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );

      state.cartItems = newCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
          const { price, cartQuantity, discount } = item;
          const discountedPrice = price - price * (discount / 100);
          const cartItemAmount = discountedPrice * cartQuantity;
          return array.push(cartItemAmount);
        });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartCheckedTotalAmount = totalAmount;
    },

    ALTERNATE_CHECKED_ITEMS: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );

      state.cartItems[productIndex].isChecked =
        !state.cartItems[productIndex].isChecked;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      state.isAllChecked = state.cartItems.every(item => item.isChecked);
    },
  },
});

export const {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
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
  cartItems => cartItems.reduce((sum, item) => sum + item.cartQuantity, 0),
);

export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;

export const selectCheckedTotalAmount = (state: RootState) =>
  state.cart.cartCheckedTotalAmount;

export const selectAllChecked = (state: RootState) => state.cart.isAllChecked;

export default cartSlice.reducer;
