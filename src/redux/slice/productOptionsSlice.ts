import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductOptionsState {
  selectedColor: { colorName: string; colorCode: string } | null;
  selectedSize: string | null;
}

const initialState: ProductOptionsState = {
  selectedColor: null,
  selectedSize: null,
};

const productOptionsSlice = createSlice({
  name: "productOptions",
  initialState,
  reducers: {
    setColor(
      state,
      action: PayloadAction<{ colorName: string; colorCode: string }>,
    ) {
      state.selectedColor = action.payload;
      state.selectedSize = null; // 색상이 변경되면 크기 초기화
    },
    setSize(state, action: PayloadAction<string>) {
      state.selectedSize = action.payload;
    },
    resetOptions(state) {
      state.selectedColor = null;
      state.selectedSize = null;
    },
  },
});

export const { setColor, setSize, resetOptions } = productOptionsSlice.actions;

export const selectColor = (state: RootState) =>
  state.productOptions.selectedColor;
export const selectSize = (state: RootState) =>
  state.productOptions.selectedSize;

export default productOptionsSlice.reducer;
