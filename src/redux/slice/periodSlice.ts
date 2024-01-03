import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // 이 경로는 실제 store 파일의 위치에 따라 변경해야 합니다.

const today = new Date();
const fiveYearsAgo = new Date(
  today.getFullYear() - 5,
  today.getMonth(),
  today.getDate(),
);

interface PeriodState {
  startDate: Date;
  endDate: Date;
}

const initialState: PeriodState = {
  startDate: fiveYearsAgo,
  endDate: today,
};

export const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = periodSlice.actions;

export const selectStartDate = (state: RootState) => state.period.startDate;
export const selectEndDate = (state: RootState) => state.period.endDate;

export default periodSlice.reducer;
