import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trackDelivery } from "@/services/deliveryTracker";
import getDeliveryToken from "@/app/actions/getDeliveryToken";
import {
  Order,
  TrackingResponseError,
  DeliveryTrackingResponse,
} from "@/type/order";
import { RootState } from "../store";

type IOrderState = Order[];

const initialState: IOrderState = [];

// 비동기 작업 정의
export const trackDeliveryThunk = createAsyncThunk(
  "orders/trackDelivery",
  async (order: Order, thunkAPI) => {
    const { carrierId, trackingNumber } = order.shippingInfo;
    const accessToken = await getDeliveryToken(false);
    const deliveryData: DeliveryTrackingResponse = await trackDelivery(
      carrierId,
      trackingNumber,
      accessToken,
    );

    // accessToken 만료 시 재발급 후 배송 추적.
    if (deliveryData.errors) {
      if (
        deliveryData.errors?.find(
          (error: TrackingResponseError) =>
            error.extensions.code === "UNAUTHENTICATED",
        )
      ) {
        const newAccessToken = await getDeliveryToken(true);
        const newDeliveryData = await trackDelivery(
          carrierId,
          trackingNumber,
          newAccessToken,
        );
        return { data: newDeliveryData, trackingNumber };
      } else {
        throw new Error(deliveryData.errors[0].message);
      }
    } else {
      return { data: deliveryData, trackingNumber };
    }
  },
);

const changeOrderStatus = (deliveryStatus: string) => {
  if (
    deliveryStatus === "AT_PICKUP" ||
    deliveryStatus === "IN_TRANSIT" ||
    deliveryStatus === "OUT_FOR_DELIVERY"
  ) {
    return "moving";
  }
  if (deliveryStatus === "DELIVERED") {
    return "done";
  }
  if (deliveryStatus === "INFORMATION_RECEIVED") {
    return "payed";
  } else return "unknown";
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDER(state, action) {
      //중복되지 않게 push
      action.payload.forEach((order: Order) => {
        if (!state.find(stateOrder => stateOrder._id === order._id)) {
          state.push(order);
        }
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(trackDeliveryThunk.fulfilled, (state, action) => {
      const { data, trackingNumber } = action.payload as {
        data: DeliveryTrackingResponse;
        trackingNumber: string;
      };
      console.log(data.data, "data");

      if (data.data) {
        const deliveryStatus = data.data.track.lastEvent.status.code;
        const deliveryTime = data.data.track.lastEvent.time;
        const deliveryEvents = data.data.track.events.edges;

        if (state.length > 0) {
          state.forEach((order, index) => {
            if (order.shippingInfo.trackingNumber === trackingNumber) {
              state[index].orderStatus = changeOrderStatus(deliveryStatus);
              state[index].shippingInfo.lastEventTime = deliveryTime;
              state[index].shippingInfo.events = deliveryEvents;
            }
          });
        }
      }
    });
  },
});

export const { STORE_ORDER } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders;

export default orderSlice.reducer;
