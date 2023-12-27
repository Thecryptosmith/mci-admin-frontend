"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import CompanyWalletInfo from "@src/app/components/CompanyWalletInfo/CompanyWalletInfo";
import OrderActions from "@src/app/components/OrderActions/OrderActions";
import OrderInfo from "@src/app/components/OrderInfo/OrderInfo";
import OrderLogs from "@src/app/components/OrderLogs/OrderLogs";
import PriceInfo from "@src/app/components/PriceInfo/PriceInfo";
import TokenInfo from "@src/app/components/TokenInfo/TokenInfo";
import UserWalletInfo from "@src/app/components/UserWalletInfo/UserWalletInfo";
import { ExchangeOrderStatusEnum } from "@src/common/emuns/ExchangeOrderStatusEnum";
import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import useExitPrompt from "@src/common/hooks/useExitPrompt";
import {
  useChangeOrderStatusMutation,
  useGetExchangeOrderQuery,
  useSendReviewingNotificationMutation,
} from "@src/lib/redux/services/adminApi";

type ExchangeOrderPageProps = {
  params: {
    id: number;
  };
};

export default function ExchangeOrderPage({ params }: ExchangeOrderPageProps) {
  const router = useRouter();

  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  const { data, isSuccess, isError } = useGetExchangeOrderQuery(params.id);

  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum>();

  const [changeOrderStatus] = useChangeOrderStatusMutation();

  const [sendReviewingNotification] = useSendReviewingNotificationMutation();

  useEffect(() => {
    if (data) {
      setOrderStatus(data.orderStatus);
    }
  }, [data]);

  useEffect(() => {
    setShowExitPrompt(true);

    return () => {
      setShowExitPrompt(false);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      sendReviewingNotification({
        id: Number(params.id),
        reviewingNotificationType: NotificationTypeEnum.START_REVIEWING_ORDER,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      router.push("/orders");
    }
  }, [isError]);

  const handleOrderStatusChange = (e: SelectChangeEvent) => {
    setOrderStatus(e.target.value as OrderStatusEnum);
  };

  const handleChangeStatusSubmit = () => {
    if (orderStatus && data) {
      changeOrderStatus({
        id: params.id,
        type: data.orderType,
        status: orderStatus,
      });
    }
  };

  return (
    <>
      {data ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <OrderActions
            id={params.id}
            type={OrderTypeEnum.EXCHANGE}
            orderStatus={data.orderStatus}
          />

          <OrderInfo
            orderStatus={orderStatus}
            handleOrderStatusChange={handleOrderStatusChange}
            statusValues={Object.values(ExchangeOrderStatusEnum)}
            handleChangeStatusSubmit={handleChangeStatusSubmit}
            data={{
              orderCode: data.orderCode,
              orderStatus: data.orderStatus,
              orderType: data.orderType,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <TokenInfo title="Sending Token" tokenData={data.sendingToken} />
              <TokenInfo
                title="Receiving Token"
                tokenData={data.receivingToken}
              />

              <PriceInfo priceData={data.priceData} />
            </Box>
          </OrderInfo>

          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <UserWalletInfo userWalletInfo={data.userWalletInfo} />

            <CompanyWalletInfo companyWalletInfo={data.companyWalletInfo} />
          </Box>

          <OrderLogs id={params.id} />
        </Box>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
