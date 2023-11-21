import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  setAccessToken,
  setRefreshToken,
} from "@src/lib/tools/localStorage/token";
import { SignInRes } from "@src/types/signInRes";

export interface authSliceState {
  user: {
    accessToken?: string;
    refreshToken?: string;
    url?: string;
    secretCode?: string;
    email: string;
  };
}

const initialState: authSliceState = {
  user: {
    accessToken: "",
    refreshToken: "",
    url: "",
    secretCode: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<SignInRes & { email: string }>) => {
      state.user.accessToken = action.payload?.accessToken ?? "";
      state.user.refreshToken = action.payload?.refreshToken ?? "";
      state.user.url = action.payload?.url ?? "";
      state.user.secretCode = action.payload?.secretCode ?? "";
      state.user.email = action.payload.email;

      setAccessToken(action.payload?.accessToken ?? "");
      setRefreshToken(action.payload?.refreshToken ?? "");
      localStorage.setItem("email", action.payload?.email ?? "");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
