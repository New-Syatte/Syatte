import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import periodReducer from "./slice/periodSlice";
import searchReducer from "./slice/searchSlice";
import sliderSlice from "./slice/sliderSlice";

const rootReducer = combineReducers({
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
  period: periodReducer,
  search: searchReducer,
  slider: sliderSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
