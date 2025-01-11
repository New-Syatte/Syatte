import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductOptionsState {
  selectedColor: { colorName: string; colorCode: string } | null;
}

const initialState: ProductOptionsState = {
  selectedColor: null,
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
    },
    resetColor(state) {
      state.selectedColor = null;
    },
  },
});

export const { setColor, resetColor } = productOptionsSlice.actions;

export const selectColor = (state: RootState) =>
  state.productOptions.selectedColor;

export default productOptionsSlice.reducer;
