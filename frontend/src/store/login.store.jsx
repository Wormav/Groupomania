import { configureStore, createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    registerForm: (state) => {
      state = !state;
      return state;
    },
  },
});

export const { registerForm } = loginSlice.actions;

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
