import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SignInRes } from "@src/types/signInRes";

export interface authSliceState {
  user: {
    accessToken?: string;
    refreshToken?: string;
    url?: string;
    secretCode?: string;
  };
}

const initialState: authSliceState = {
  user: { accessToken: "", refreshToken: "", url: "", secretCode: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<SignInRes>) => {
      state.user.accessToken = action.payload?.accessToken ?? "";
      state.user.refreshToken = action.payload?.refreshToken ?? "";
      state.user.url = action.payload?.url ?? "";
      state.user.secretCode = action.payload?.secretCode ?? "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
