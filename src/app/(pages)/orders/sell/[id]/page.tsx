"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import BankAccountInfo from "@src/app/components/BankAccountInfo/BankAccountInfo";
import CompanyWalletInfo from "@src/app/components/CompanyWalletInfo/CompanyWalletInfo";
import OrderActions from "@src/app/components/OrderActions/OrderActions";
import OrderInfo from "@src/app/components/OrderInfo/OrderInfo";
import OrderLogs from "@src/app/components/OrderLogs/OrderLogs";
import TokenInfo from "@src/app/components/TokenInfo/TokenInfo";
import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import { SellOrderStatusEnum } from "@src/common/emuns/SellOrderStatusEnum";
import useExitPrompt from "@src/common/hooks/useExitPrompt";
import {
  useChangeOrderStatusMutation,
  useGetSellOrderQuery,
  useSendReviewingNotificationMutation,
} from "@src/lib/redux/services/adminApi";

type SellOrderPageProps = {
  params: {
    id: number;
  };
};

export default function SellOrderPage({ params }: SellOrderPageProps) {
  const router = useRouter();

  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  const { data, isSuccess, isError } = useGetSellOrderQuery(params.id);

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
            type={OrderTypeEnum.SELL}
            orderStatus={data.orderStatus}
          />

          <OrderInfo
            orderStatus={orderStatus}
            handleOrderStatusChange={handleOrderStatusChange}
            statusValues={Object.values(SellOrderStatusEnum)}
            handleChangeStatusSubmit={handleChangeStatusSubmit}
            data={{
              orderCode: data.orderCode,
              orderStatus: data.orderStatus,
              orderType: data.orderType,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <TokenInfo title="Sending Token" tokenData={data.sendingToken} />
            </Box>
          </OrderInfo>

          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <CompanyWalletInfo companyWalletInfo={data.companyWalletInfo} />

            <BankAccountInfo bankAccountInfo={data.userBankAccount} />
          </Box>

          <OrderLogs id={params.id} />
        </Box>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
