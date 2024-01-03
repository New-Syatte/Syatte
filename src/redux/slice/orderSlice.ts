import { Order } from "@/model/order";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IOrderState {
  orderHistory: Order;
}

const initialState: IOrderState = {
  orderHistory: {
    userEmail: "",
    orderDate: "",
    orderStatus: "preparing",
    orderAmount: 0,
    orderCount: 0,
    cartItems: [],
    billingAddress: {
      userEmail: "",
      memo: "",
      name: "",
      phone: "",
    },
    shippingAddress: {
      postalCode: "",
      city: "",
      line: "",
      name: "",
      phone: "",
    },
    createdAt: "",
    _id: "",
  },
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDER(state, action) {
      state.orderHistory = action.payload;
    },
  },
});

export const { STORE_ORDER } = orderSlice.actions;

export const selectOrderHistory = (state: RootState) =>
  state.orders.orderHistory;
// export const selectTotalOrderAmount = (state: RootState) =>
//   state.orders.totalOrderAmount;

export default orderSlice.reducer;
