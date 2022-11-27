import { configureStore, createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

const loginSlice = createSlice({
  name: "logged",
  initialState: false,
  reducers: {
    isLogged: (state) => {
      const token = cookie.get("jwt");
      if (token) state = true;
      else state = false;
      return state;
    },
  },
});

export const { isLogged } = loginSlice.actions;

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
