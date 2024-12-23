import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import periodReducer from "./slice/periodSlice";
import searchReducer from "./slice/searchSlice";
import sliderSlice from "./slice/sliderSlice";
import productTempReducer from "./slice/productTempSlice";
import productOptionsReducer from "./slice/productOptionsSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
  period: periodReducer,
  search: searchReducer,
  slider: sliderSlice,
  productTemp: productTempReducer,
  productOptions: productOptionsReducer,
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
