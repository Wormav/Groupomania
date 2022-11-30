import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userIdDataFunction: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { userIdDataFunction } = userSlice.actions;

export const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
