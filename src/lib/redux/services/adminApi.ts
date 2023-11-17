import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseApiUrl } from "@src/common/consts/baseApiUrl";
import { SignInReqPayload } from "@src/types/signInReqPayload";
import { SignInRes } from "@src/types/signInRes";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInRes, SignInReqPayload>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = adminApi;
