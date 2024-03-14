import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import periodReducer from "./slice/periodSlice";
import searchReducer from "./slice/searchSlice";
import { rootSaga } from "./saga/sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
  period: periodReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
