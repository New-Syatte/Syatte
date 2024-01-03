import { IProduct } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IProductState {
  products: IProduct[];
  minPrice: number;
  maxPrice: number;
}

const initialState: IProductState = {
  products: [],
  minPrice: 0,
  maxPrice: 10000,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;

      const array: number[] = [];
      products.map((product: IProduct) => {
        const price = product.price;
        return array.push(price);
      });

      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectMinPrice = (state: RootState) => state.product.minPrice;
export const selectMaxPrice = (state: RootState) => state.product.maxPrice;

export default productSlice.reducer;
