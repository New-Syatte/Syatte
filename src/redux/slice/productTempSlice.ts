// 상품 상세에서 옵션 선택 시 임시 저장 슬라이스
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TempItem {
  color: string;
  colorCode: string;
  size: string;
  price: number;
  discount: number;
  quantity: number;
}

interface ProductTempState {
  tempItems: TempItem[];
}

const initialState: ProductTempState = {
  tempItems: [],
};

const productTempSlice = createSlice({
  name: "productTemp",
  initialState,
  reducers: {
    addTempItem(state, action: PayloadAction<TempItem>) {
      state.tempItems.push(action.payload);
    },
    updateTempItemQuantity(
      state,
      action: PayloadAction<{ index: number; quantity: number }>,
    ) {
      const { index, quantity } = action.payload;
      if (state.tempItems[index]) {
        state.tempItems[index].quantity = quantity;
      }
    },
    removeTempItem(state, action: PayloadAction<number>) {
      state.tempItems.splice(action.payload, 1);
    },
    resetTempItems(state) {
      state.tempItems = [];
    },
  },
});

export const {
  addTempItem,
  updateTempItemQuantity,
  removeTempItem,
  resetTempItems,
} = productTempSlice.actions;

export const selectTempItems = (state: RootState) =>
  state.productTemp.tempItems;

export default productTempSlice.reducer;
