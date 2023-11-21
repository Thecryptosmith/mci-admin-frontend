import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseApiUrl } from "@src/common/consts/baseApiUrl";
import { getAccessToken } from "@src/lib/tools/localStorage/token";
import { AdminsListRes } from "@src/types/adminsListRes";
import { ChangeAdminStatusReqPayload } from "@src/types/changeAdminStatusReqPayload";
import { CreateAdminReqPayload } from "@src/types/createAdminReqPayload";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${getAccessToken() ?? ""}`);
    },
  }),
  tagTypes: ["Admins"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation<void, CreateAdminReqPayload>({
      query: (body) => ({
        url: "/admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admins", id: "LIST" }],
    }),

    getAdminsList: builder.query<AdminsListRes[], void>({
      query: () => ({
        url: "/admin/list",
        method: "GET",
      }),
      providesTags: [{ id: "LIST", type: "Admins" }],
    }),

    activateAdmin: builder.mutation<void, ChangeAdminStatusReqPayload>({
      query: (body) => ({
        url: "/admin/activate",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admins", id: "LIST" }],
    }),

    inactivateAdmin: builder.mutation<void, ChangeAdminStatusReqPayload>({
      query: (body) => ({
        url: "/admin/inactivate",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admins", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminsListQuery,
  useActivateAdminMutation,
  useInactivateAdminMutation,
} = adminApi;
