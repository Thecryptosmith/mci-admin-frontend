import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@src/lib/redux/services/baseQueryWithReauth";
import { AdminsListRes } from "@src/types/adminsListRes";
import { ChangeAdminStatusReqPayload } from "@src/types/changeAdminStatusReqPayload";
import { ChangeUserWalletStatusReqPayload } from "@src/types/changeUserWalletStatusReqPayload";
import { CoinMarketTokenInfo } from "@src/types/CoinMarketToken";
import { CreateAdminReqPayload } from "@src/types/createAdminReqPayload";
import { CreateIncidentRecordReqPayload } from "@src/types/createIncidentRecordReqPayload";
import { CreateNetworkReqPayload } from "@src/types/createNetworkReqPayload";
import { CreateTokenReqPayload } from "@src/types/createTokenReqPayload";
import { GetDefaultTokenRes } from "@src/types/getDefaultTokenRes";
import { GetFullTokenInfoRes } from "@src/types/getFullTokenInfoRes";
import { GetNetworksListRes } from "@src/types/getNetworksListRes";
import { GetOrderLogsRes } from "@src/types/getOrderLogsRes";
import { GetOrdersQueryParams } from "@src/types/getOrdersQueryParams";
import { GetOrdersRes } from "@src/types/getOrdersRes";
import { GetTokensListRes } from "@src/types/getTokensListRes";
import { GetTokensQueryParams } from "@src/types/getTokensQueryParams";
import { GetTokensRes } from "@src/types/getTokensRes";
import { GetTrendingTokensRes } from "@src/types/getTrendingTokensRes";
import { GetUsersQueryParams } from "@src/types/getUsersQueryParams";
import { GetUsersRes } from "@src/types/getUsersRes";
import { GetUserWalletsQueryParams } from "@src/types/getUserWalletsQueryParams";
import { GetUserWalletsRes } from "@src/types/getUserWalletsRes";
import { ChangeOrderStatusReqPayload } from "@src/types/orders/changeOrderStatusReqPayload";
import {
  BuyOrderType,
  ExchangeOrderType,
  SellOrderType,
} from "@src/types/orderTypes";
import { ProcessOrderReqPayload } from "@src/types/processOrderReqPayload";
import { SendChangeOrderStatusNotificationReqPayload } from "@src/types/sendChangeOrderStatusNotificationReqPayload";
import { SendReviewingNotificationReqPayload } from "@src/types/sendReviewingNotificationReqPayload";
import { UpdateTrendingTokensReqPayload } from "@src/types/updateTrendingTokensReqPayload";
import { UpdateUserVerificationReqPayload } from "@src/types/updateUserVerificationReqPayload";
import { GetUserForVerificationRes } from "@src/types/userVerificationTypes";
import { GetAllVerificationRequestsQueryParams } from "@src/types/verification-requests/getAllVerificationRequestsQueryParams";
import { GetAllVerificationRequestsRes } from "@src/types/verification-requests/getAllVerificationRequestsRes";
import { GetAllWalletProvidersQueryParams } from "@src/types/wallet-providers/getAllWalletProvidersQueryParams";
import { GetAllWalletProvidersRes } from "@src/types/wallet-providers/getAllWalletProvidersRes";
import { GetNetworkTokensParams } from "@src/types/wallet-providers/getNetworkTokensParams";
import { GetNetworkTokensRes } from "@src/types/wallet-providers/getNetworkTokensRes";
import { GetWalletProviderRes } from "@src/types/wallet-providers/getWalletProviderRes";
import { UpdateWalletProviderReqPayload } from "@src/types/wallet-providers/updateWalletProviderReqPayload";
import { UpdateWalletProviderRes } from "@src/types/wallet-providers/updateWalletProviderRes";

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
        userId,
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
        userId && queryParams.set("userId", `${userId}`);

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

    sendReviewingNotification: builder.mutation<
      void,
      SendReviewingNotificationReqPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/order/notification/reviewing/${id}`,
        method: "POST",
        body,
      }),
    }),

    sendChangeOrderStatusNotification: builder.mutation<
      void,
      SendChangeOrderStatusNotificationReqPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/order/notification/order-change-status/${id}`,
        method: "POST",
        body,
      }),
    }),

    getUserWallets: builder.query<GetUserWalletsRes, GetUserWalletsQueryParams>(
      {
        query: ({ status, limit, offset }) => {
          const queryParams = new URLSearchParams();

          if (status && status.length > 0) {
            status.forEach((stat) => {
              queryParams.append("status", stat);
            });
          }

          limit && queryParams.set("limit", `${limit}`);
          (offset || offset === 0) && queryParams.set("offset", `${offset}`);

          return {
            url: "/user-wallet",
            method: "GET",
            params: queryParams,
          };
        },
        providesTags: [{ type: "Admin", id: "WALLETS" }],
      },
    ),

    changeUserWalletStatus: builder.mutation<
      void,
      ChangeUserWalletStatusReqPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/user-wallet/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "WALLETS" }],
    }),

    getTokensList: builder.query<GetTokensListRes, GetTokensQueryParams>({
      query: ({ limit, offset, search }) => {
        const queryParams = new URLSearchParams();

        search && queryParams.set("search", search);
        limit && queryParams.set("limit", `${limit}`);
        (offset || offset === 0) && queryParams.set("offset", `${offset}`);

        return {
          url: "/token-info",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: [{ type: "Admin", id: "TOKENS" }],
    }),

    searchTokenBySlug: builder.query<CoinMarketTokenInfo, string>({
      query: (slug) => ({
        url: `/token-info/search?slug=${slug}`,
        method: "GET",
      }),
    }),

    getDefaultToken: builder.query<GetDefaultTokenRes, void>({
      query: () => ({
        url: "/token-info/get-default-token",
        method: "GET",
      }),
    }),

    searchPair: builder.query<
      { [key: string]: { altname: string; wsname: string } },
      string
    >({
      query: (pair) => ({
        url: `/token-info/asset-pair/${pair}`,
        method: "GET",
      }),
    }),

    getAllNetworks: builder.query<GetNetworksListRes, void>({
      query: () => ({
        url: "/network",
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "NETWORKS" }],
    }),

    createToken: builder.mutation<void, CreateTokenReqPayload>({
      query: (body) => ({
        url: "/token-info/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "TOKENS" }],
    }),

    createNetwork: builder.mutation<void, CreateNetworkReqPayload>({
      query: (body) => ({
        url: "/network",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "NETWORKS" }],
    }),

    updateNetwork: builder.mutation<
      void,
      { id: number } & CreateNetworkReqPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/network/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "NETWORKS" }],
    }),

    deleteNetwork: builder.mutation<void, number>({
      query: (id) => ({
        url: `/network/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Admin", id: "NETWORKS" }],
    }),

    getTrendingTokens: builder.query<GetTrendingTokensRes, void>({
      query: () => ({
        url: "/token-info/trending",
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "TRENDING" }],
    }),

    updateTrendingTokens: builder.mutation<
      void,
      UpdateTrendingTokensReqPayload
    >({
      query: (body) => ({
        url: "/token-info/trending",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "TRENDING" }],
    }),

    getFullTokenInfo: builder.query<GetFullTokenInfoRes, number>({
      query: (id) => ({
        url: `/token-info/${id}`,
        method: "GET",
      }),
    }),

    updateToken: builder.mutation<void, CreateTokenReqPayload>({
      query: (body) => ({
        url: "/token-info",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "TOKENS" }],
    }),

    getAllWalletProviders: builder.query<
      GetAllWalletProvidersRes,
      GetAllWalletProvidersQueryParams
    >({
      query: ({ limit, offset, search }) => {
        const queryParams = new URLSearchParams();

        search && queryParams.set("search", search);
        limit && queryParams.set("limit", `${limit}`);
        (offset || offset === 0) && queryParams.set("offset", `${offset}`);

        return {
          url: "/wallet-provider",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: [{ type: "Admin", id: "WALLET-PROVIDERS" }],
    }),

    getNetworkTokens: builder.query<
      GetNetworkTokensRes,
      GetNetworkTokensParams
    >({
      query: ({ id, limit, offset, search }) => {
        const queryParams = new URLSearchParams();

        search && queryParams.set("search", search);
        limit && queryParams.set("limit", `${limit}`);
        (offset || offset === 0) && queryParams.set("offset", `${offset}`);

        return {
          url: `/network/${id}/tokens`,
          method: "GET",
          params: queryParams,
        };
      },
    }),

    createWalletProvider: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "/wallet-provider",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "WALLET-PROVIDERS" }],
    }),

    getWalletProvider: builder.query<GetWalletProviderRes, number>({
      query: (id) => ({
        url: `/wallet-provider/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Admin", id: "WALLET-PROVIDER" }],
    }),

    updateWalletProvider: builder.mutation<
      void,
      UpdateWalletProviderReqPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/wallet-provider/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error) =>
        !error
          ? [
              { type: "Admin", id: "WALLET-PROVIDER" },
              { type: "Admin", id: "WALLET-PROVIDERS" },
            ]
          : [],
    }),

    createWalletProviderLogo: builder.mutation<
      UpdateWalletProviderRes,
      FormData
    >({
      query: (body) => ({
        url: "/wallet-provider/logo",
        method: "POST",
        body,
      }),
    }),

    changeOrderStatus: builder.mutation<void, ChangeOrderStatusReqPayload>({
      query: ({ id, type, ...body }) => ({
        url: `/order/${type}/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Admin", id: `${arg.type.toUpperCase()}-ORDER` },
      ],
    }),

    getAllVerificationRequests: builder.query<
      GetAllVerificationRequestsRes,
      GetAllVerificationRequestsQueryParams
    >({
      query: ({ limit, offset, statuses, orderField, orderDirection }) => {
        const queryParams = new URLSearchParams();

        if (statuses && statuses.length > 0) {
          statuses.forEach((status) => {
            queryParams.append("status", status);
          });
        }

        orderField && queryParams.set("orderField", orderField);
        orderDirection && queryParams.set("orderDirection", orderDirection);
        limit && queryParams.set("limit", `${limit}`);
        (offset || offset === 0) && queryParams.set("offset", `${offset}`);

        return {
          url: `/user-verification-request`,
          method: "GET",
          params: queryParams,
        };
      },
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
  useSendReviewingNotificationMutation,
  useSendChangeOrderStatusNotificationMutation,
  useGetUserWalletsQuery,
  useChangeUserWalletStatusMutation,
  useGetTokensListQuery,
  useSearchTokenBySlugQuery,
  useGetDefaultTokenQuery,
  useSearchPairQuery,
  useGetAllNetworksQuery,
  useCreateTokenMutation,
  useCreateNetworkMutation,
  useUpdateNetworkMutation,
  useDeleteNetworkMutation,
  useGetTrendingTokensQuery,
  useUpdateTrendingTokensMutation,
  useGetFullTokenInfoQuery,
  useUpdateTokenMutation,
  useGetAllWalletProvidersQuery,
  useGetNetworkTokensQuery,
  useCreateWalletProviderMutation,
  useGetWalletProviderQuery,
  useUpdateWalletProviderMutation,
  useCreateWalletProviderLogoMutation,
  useChangeOrderStatusMutation,
  useGetAllVerificationRequestsQuery,
} = adminApi;
