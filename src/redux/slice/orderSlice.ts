import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverTrackDelivery } from "@/app/actions";
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
    try {
      const { carrierId, trackingNumber } = order.shippingInfo;
      const deliveryData = await serverTrackDelivery(carrierId, trackingNumber);

      if (deliveryData.data?.track) {
        const deliveryStatus = deliveryData.data.track.lastEvent.status.code;
        const status = changeOrderStatus(deliveryStatus);
        const events = deliveryData.data.track.events.edges;

        // API를 통해 Sanity 데이터베이스 업데이트
        const response = await fetch("/api/orders/update-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order._id,
            status,
            events,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }
      }

      return { data: deliveryData, trackingNumber };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
    builder
      .addCase(trackDeliveryThunk.fulfilled, (state, action) => {
        const { data, trackingNumber } = action.payload as {
          data: DeliveryTrackingResponse;
          trackingNumber: string;
        };

        if (data.data) {
          const deliveryStatus = data.data.track.lastEvent.status.code;
          const deliveryTime = data.data.track.lastEvent.time;
          const deliveryEvents = data.data.track.events.edges;

          if (state.length > 0) {
            state.forEach((order, index) => {
              if (!order.shippingInfo) return;
              if (order.shippingInfo.trackingNumber === trackingNumber) {
                state[index].orderStatus = changeOrderStatus(deliveryStatus);
                state[index].shippingInfo.lastEventTime = deliveryTime;
                state[index].shippingInfo.events = deliveryEvents;
              }
            });
          }
        }
      })
      .addCase(trackDeliveryThunk.rejected, (state, action) => {
        console.error("배송 조회 실패:", action.payload);
      });
  },
});

export const { STORE_ORDER } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders;

export default orderSlice.reducer;
