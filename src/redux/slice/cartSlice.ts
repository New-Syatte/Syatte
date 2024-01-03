import { ICartItem } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";

interface ICartState {
  cartItems: ICartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
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
        toast.success(`${action.payload.name} 상품이 1개가 추가 되었습니다.`);
      } else {
        const tempProduct = {
          // ...action.payload,
          id: action.payload.id,
          imageURL: action.payload.imageURL,
          name: action.payload.name,
          price: action.payload.price,
          cartQuantity: increaseCount,
          _key: action.payload.id,
        };

        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} 상품이 추가되었습니다.`);
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
        toast.success(`${action.payload.name} 1개가 삭제 되었습니다.`);
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          item => item.id !== action.payload.id,
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItem = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: state => {
      state.cartItems = [];
      toast.success("장바구니가 비었습니다.");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  REMOVE_FROM_CART,
  DECREASE_CART,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;

export default cartSlice.reducer;
