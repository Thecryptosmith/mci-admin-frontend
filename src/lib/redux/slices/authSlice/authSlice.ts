import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  setAccessToken,
  setRefreshToken,
} from "@src/lib/tools/localStorage/token";
import { NotificationData } from "@src/types/notificationData";
import { SignInRes } from "@src/types/signInRes";

export interface authSliceState {
  user: {
    accessToken?: string;
    refreshToken?: string;
    url?: string;
    secretCode?: string;
    email: string;
  };
  notificationData: NotificationData | null;
}

const initialState: authSliceState = {
  user: {
    accessToken: "",
    refreshToken: "",
    url: "",
    secretCode: "",
    email: "",
  },
  notificationData: null,
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
    setNotificationData: (state, action: PayloadAction<NotificationData>) => {
      state.notificationData = action.payload;
    },
    resetNotificationData: (state) => {
      state.notificationData = null;
    },
  },
});

export const { setUser, logout, setNotificationData, resetNotificationData } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
