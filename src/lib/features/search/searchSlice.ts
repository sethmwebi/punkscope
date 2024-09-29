import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  term: string;
}

const initialState: SearchState = {
  term: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
