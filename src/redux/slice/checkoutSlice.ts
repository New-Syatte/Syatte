import { BillingAddress, ShippingAddress } from "@/type/order";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  shippingAddress:
    typeof window !== "undefined"
      ? localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress")!)
        : {}
      : ({} as ShippingAddress),
  billingAddress:
    typeof window !== "undefined"
      ? localStorage.getItem("billingAddress")
        ? JSON.parse(localStorage.getItem("billingAddress")!)
        : {}
      : ({} as BillingAddress),
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    SAVE_BILLING_ADDRESS: (state, action) => {
      state.billingAddress = action.payload;
      localStorage.setItem("billingAddress", JSON.stringify(action.payload));
    },
  },
});

export const { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } =
  checkoutSlice.actions;

export const selectShippingAddress = (state: RootState) =>
  state.checkout.shippingAddress;
export const selectBillingAddress = (state: RootState) =>
  state.checkout.billingAddress;

export default checkoutSlice.reducer;
