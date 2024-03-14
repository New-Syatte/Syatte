import { delay, put, takeEvery } from "redux-saga/effects";
import { trackDeliveryThunk } from "../slice/orderSlice";

// 사가 미들웨어 설정
export function* rootSaga() {
  yield takeEvery("orders/trackDeliveryRequest", trackDeliverySaga);
}

// 사가 정의
function* trackDeliverySaga(action: any) {
  yield delay(10000); // 10초 딜레이
  yield put(trackDeliveryThunk(action.payload)); // 액션 디스패치
}
