import { IBillingAddress, IShippingAddress } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  shippingAddress: {} as IShippingAddress,
  billingAddress: {} as IBillingAddress
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = action.payload;
    },
    SAVE_BILLING_ADDRESS: (state, action) => {
      state.billingAddress = action.payload;
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
