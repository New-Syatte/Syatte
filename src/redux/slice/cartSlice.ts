import { CartItem } from "@/type/cart";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ICartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartCheckedTotalQuantity: number;
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
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartCheckedTotalQuantity: 0,
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
          // ...action.payload,
          id: action.payload.id,
          imageURL: action.payload.imageURL,
          name: action.payload.name,
          price: action.payload.price,
          cartQuantity: increaseCount,
          isChecked: true,
          _key: action.payload.id,
        };

        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_TOTAL_QUANTITY: state => {
      const array: number[] = [];
      state.cartItems.map(item => {
        const { cartQuantity } = item;

        const quantity = cartQuantity;
        return array.push(quantity);
      });

      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;
    },

    CALCULATE_SUBTOTAL: state => {
      const array: number[] = [];

      state.cartItems.map(item => {
        const { price, cartQuantity } = item;

        const cartItemAmount = price * cartQuantity;
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

      // isAllchecked 확인
      state.isAllChecked = true;
    },
    UNCHECK_ALL_ITEMS: state => {
      state.cartItems.map(item => {
        item.isChecked = false;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      // isAllchecked 확인
      state.isAllChecked = false;
    },
    CALCULATE_CHECKED_ITEMS_SUBTOTAL: state => {
      const array: number[] = [];

      state.cartItems
        .filter(item => item.isChecked)
        .map(item => {
          const { price, cartQuantity } = item;

          const cartItemAmount = price * cartQuantity;
          return array.push(cartItemAmount);
        });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartCheckedTotalAmount = totalAmount;
    },
    CALCULATE_CHECKED_ITEMS_QUANTITY: state => {
      const array: number[] = [];

      state.cartItems
        .filter(item => item.isChecked)
        .map(item => {
          const { cartQuantity } = item;

          const quantity = cartQuantity;
          return array.push(quantity);
        });

      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartCheckedTotalQuantity = totalQuantity;
    },
    ALTERNATE_CHECKED_ITEMS: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );

      state.cartItems[productIndex].isChecked =
        !state.cartItems[productIndex].isChecked;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // isAllchecked 확인
      state.isAllChecked = state.cartItems.every(item => item.isChecked)
        ? true
        : false;
    },
  },
});

export const {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
  REMOVE_CHECKED_ITEMS_FROM_CART,
  SELECT_ALL_ITEMS,
  UNCHECK_ALL_ITEMS,
  REMOVE_FROM_CART,
  DECREASE_CART,
  CALCULATE_CHECKED_ITEMS_SUBTOTAL,
  CALCULATE_CHECKED_ITEMS_QUANTITY,
  SAVE_URL,
  ALTERNATE_CHECKED_ITEMS,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCheckedCartItems = (state: RootState) =>
  state.cart.cartItems.filter(item => item.isChecked);
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;
export const selectCheckedTotalQuantity = (state: RootState) =>
  state.cart.cartCheckedTotalQuantity;
export const selectCheckedTotalAmount = (state: RootState) =>
  state.cart.cartCheckedTotalAmount;
export const selectAllChecked = (state: RootState) => state.cart.isAllChecked;

export default cartSlice.reducer;
