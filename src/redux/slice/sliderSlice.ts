// sliderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliderState {
  currentSlide: number;
  sliderLength: number;
}

interface SlidersState {
  [id: string]: SliderState;
}

const initialState: SlidersState = {};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    nextSlide: (state, action: PayloadAction<string>) => {
      const slider = state[action.payload];
      if (slider) {
        slider.currentSlide =
          slider.currentSlide === slider.sliderLength - 1
            ? 0
            : slider.currentSlide + 1;
      }
    },
    prevSlide: (state, action: PayloadAction<string>) => {
      const slider = state[action.payload];
      if (slider) {
        slider.currentSlide =
          slider.currentSlide === 0
            ? slider.sliderLength - 1
            : slider.currentSlide - 1;
      }
    },
    setSliderLength: (
      state,
      action: PayloadAction<{ id: string; length: number }>,
    ) => {
      const { id, length } = action.payload;
      if (!state[id]) {
        state[id] = { currentSlide: 0, sliderLength: length };
      } else {
        state[id].sliderLength = length;
      }
    },
    removeSlider: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    setCurrentSlide: (
      state,
      action: PayloadAction<{ id: string; index: number }>,
    ) => {
      // index를 전달받아 현재 슬라이드를 설정
      const slider = state[action.payload.id];
      if (slider) {
        slider.currentSlide = action.payload.index;
      }
    },
  },
});

export const {
  nextSlide,
  prevSlide,
  setSliderLength,
  removeSlider,
  setCurrentSlide,
} = sliderSlice.actions;

export default sliderSlice.reducer;
