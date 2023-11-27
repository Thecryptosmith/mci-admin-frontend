import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@src/lib/redux/services/baseQueryWithReauth";
import { AdminsListRes } from "@src/types/adminsListRes";
import { ChangeAdminStatusReqPayload } from "@src/types/changeAdminStatusReqPayload";
import { CreateAdminReqPayload } from "@src/types/createAdminReqPayload";
import { CreateIncidentRecordReqPayload } from "@src/types/createIncidentRecordReqPayload";
import { GetUsersQueryParams } from "@src/types/getUsersQueryParams";
import { GetUsersRes } from "@src/types/getUsersRes";
import { UpdateUserVerificationReqPayload } from "@src/types/updateUserVerificationReqPayload";
import { GetUserForVerificationRes } from "@src/types/userVerificationTypes";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation<void, CreateAdminReqPayload>({
      query: (body) => ({
        url: "/admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "ADMINS-LIST" }],
    }),

    getAdminsList: builder.query<AdminsListRes[], void>({
      query: () => ({
        url: "/admin/list",
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "ADMINS-LIST" }],
    }),

    activateAdmin: builder.mutation<void, ChangeAdminStatusReqPayload>({
      query: (body) => ({
        url: "/admin/activate",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "ADMINS-LIST" }],
    }),

    inactivateAdmin: builder.mutation<void, ChangeAdminStatusReqPayload>({
      query: (body) => ({
        url: "/admin/inactivate",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "ADMINS-LIST" }],
    }),

    getUsersList: builder.query<GetUsersRes, GetUsersQueryParams>({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Admin", id: "USERS-LIST" }],
    }),

    getUserForVerification: builder.query<GetUserForVerificationRes, number>({
      query: (id) => ({
        url: `/user/verification/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "USER" }],
    }),

    updateUserVerification: builder.mutation<
      void,
      UpdateUserVerificationReqPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/user/verification/${id}`,
        method: "PATCH",
        body,
      }),
    }),

    createIncidentRecord: builder.mutation<
      void,
      CreateIncidentRecordReqPayload
    >({
      query: (body) => ({
        url: "/incident-records",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "USER" }],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminsListQuery,
  useActivateAdminMutation,
  useInactivateAdminMutation,
  useGetUsersListQuery,
  useGetUserForVerificationQuery,
  useUpdateUserVerificationMutation,
  useCreateIncidentRecordMutation,
} = adminApi;
