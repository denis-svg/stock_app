import { configureStore } from "@reduxjs/toolkit";
import dayReducer from "./daySlice";

const store = configureStore({
  reducer: {
    day: dayReducer,
  },
});

export default store;
