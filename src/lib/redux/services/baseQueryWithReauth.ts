import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { baseApiUrl } from "@src/common/consts/baseApiUrl";
import { logout, ReduxState, setUser } from "@src/lib/redux";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
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
  const state = api.getState() as ReduxState;
  const email = state.auth.user.email;

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
      api.dispatch(
        setUser({ ...refreshResult.data, email, refreshToken } as {
          email: string;
          accessToken: string;
          refreshToken: string;
        }),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      removeTokens();
      api.dispatch(logout());
    }
  }

  return result;
};
