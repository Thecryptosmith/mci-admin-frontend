import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { baseApiUrl } from "@src/common/consts/baseApiUrl";
import {
  clearLocalStorage,
  getAccessToken,
  getRefreshToken,
} from "@src/lib/tools/localStorage/token";

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  prepareHeaders: (headers) => {
    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = getRefreshToken();
  const email = localStorage.getItem("email") ?? "";

  if (result.error && result.error.status === 401 && refreshToken) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-access-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      api.dispatch({
        type: "auth/setUser",
        payload: { ...refreshResult.data, email, refreshToken } as {
          email: string;
          accessToken: string;
          refreshToken: string;
        },
      });
      result = await baseQuery(args, api, extraOptions);
    } else {
      clearLocalStorage();
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};
