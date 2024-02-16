import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    matchingResults: [] as any[],
  },
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setMatchingResults: (state, action: PayloadAction<any[]>) => {
      state.matchingResults = action.payload;
    },
  },
});

export const { setSearchQuery, setMatchingResults } = searchSlice.actions;

export const selectSearchQuery = (state: any) => state.search.searchQuery;
export const selectMatchingResults = (state: any) =>
  state.search.matchingResults;

export default searchSlice.reducer;
