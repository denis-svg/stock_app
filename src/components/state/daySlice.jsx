import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  day: "",
  date: "",
};

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    setNew: (state, action) => {
      state.day = action.payload.day;
      state.date = action.payload.date;
    },
  },
});

export default daySlice.reducer;
export const { setNew } = daySlice.actions;
