import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@src/lib/redux/services/baseQueryWithReauth";
import { AdminsListRes } from "@src/types/adminsListRes";
import { ChangeAdminStatusReqPayload } from "@src/types/changeAdminStatusReqPayload";
import { CreateAdminReqPayload } from "@src/types/createAdminReqPayload";
import { CreateIncidentRecordReqPayload } from "@src/types/createIncidentRecordReqPayload";
import { GetOrderLogsRes } from "@src/types/getOrderLogsRes";
import { GetOrdersQueryParams } from "@src/types/getOrdersQueryParams";
import { GetOrdersRes } from "@src/types/getOrdersRes";
import { GetTokensQueryParams } from "@src/types/getTokensQueryParams";
import { GetTokensRes } from "@src/types/getTokensRes";
import { GetUsersQueryParams } from "@src/types/getUsersQueryParams";
import { GetUsersRes } from "@src/types/getUsersRes";
import {
  BuyOrderType,
  ExchangeOrderType,
  SellOrderType,
} from "@src/types/orderTypes";
import { ProcessOrderReqPayload } from "@src/types/processOrderReqPayload";
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

    getOrders: builder.query<GetOrdersRes, GetOrdersQueryParams>({
      query: ({
        orderStatuses,
        limit,
        offset,
        startDate,
        endDate,
        orderTypes,
        incomingAssets,
        outgoingAssets,
      }) => {
        const queryParams = new URLSearchParams();

        if (orderStatuses && orderStatuses.length > 0) {
          orderStatuses.forEach((status) => {
            queryParams.append("orderStatuses", status);
          });
        }

        if (orderTypes && orderTypes.length > 0) {
          orderTypes.forEach((type) => {
            queryParams.append("orderTypes", type);
          });
        }

        if (incomingAssets && incomingAssets.length > 0) {
          incomingAssets.forEach((asset) => {
            queryParams.append("incomingAssets", asset);
          });
        }

        if (outgoingAssets && outgoingAssets.length > 0) {
          outgoingAssets.forEach((asset) => {
            queryParams.append("outgoingAssets", asset);
          });
        }

        startDate && queryParams.set("startDate", startDate);
        endDate && queryParams.set("endDate", endDate);
        limit && queryParams.set("limit", `${limit}`);
        (offset || offset === 0) && queryParams.set("offset", `${offset}`);

        return {
          url: "/order",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: [{ type: "Admin", id: "ORDERS" }],
    }),

    getExchangeOrder: builder.query<ExchangeOrderType, number>({
      query: (id) => ({
        url: `/order/exchange/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "EXCHANGE-ORDER" }],
    }),

    getBuyOrder: builder.query<BuyOrderType, number>({
      query: (id) => ({
        url: `/order/buy/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "BUY-ORDER" }],
    }),

    getSellOrder: builder.query<SellOrderType, number>({
      query: (id) => ({
        url: `/order/sell/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "SELL-ORDER" }],
    }),

    getTokens: builder.query<GetTokensRes, GetTokensQueryParams>({
      query: ({ limit, offset, search }) => {
        const queryParams = new URLSearchParams();

        search && queryParams.set("search", search);
        limit && queryParams.set("limit", `${limit}`);
        (offset || offset === 0) && queryParams.set("offset", `${offset}`);

        return {
          url: "/token/get-tokens-for-order",
          method: "GET",
          params: queryParams,
        };
      },
    }),

    getOrderLogs: builder.query<GetOrderLogsRes, number>({
      query: (id) => ({
        url: `/order/logs/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "ORDER-LOGS" }],
    }),

    processOrder: builder.mutation<void, ProcessOrderReqPayload>({
      query: ({ id, type, ...body }) => ({
        url: `/order/process/${type}/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Admin", id: "ORDER-LOGS" },
        { type: "Admin", id: "EXCHANGE-ORDER" },
        { type: "Admin", id: "BUY-ORDER" },
        { type: "Admin", id: "SELL-ORDER" },
      ],
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
  useGetOrdersQuery,
  useGetExchangeOrderQuery,
  useGetBuyOrderQuery,
  useGetSellOrderQuery,
  useGetTokensQuery,
  useGetOrderLogsQuery,
  useProcessOrderMutation,
} = adminApi;
