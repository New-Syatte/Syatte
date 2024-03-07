import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  accessToken: "",
  delivery: {},
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    SAVE_ACCESS_TOKEN: (state, action) => {
      state.accessToken = action.payload;
    },
    SAVE_DELIVERY: (state, action) => {
      state.delivery = action.payload;
    },
  },
});

export const { SAVE_ACCESS_TOKEN, SAVE_DELIVERY } = deliverySlice.actions;

export const selectAccessToken = (state: RootState) =>
  state.delivery.accessToken;
export const selectDelivery = (state: RootState) => state.delivery.delivery;

export default deliverySlice.reducer;
