"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box/Box";
import BankAccountInfo from "@src/app/components/BankAccountInfo/BankAccountInfo";
import OrderActions from "@src/app/components/OrderActions/OrderActions";
import OrderInfo from "@src/app/components/OrderInfo/OrderInfo";
import OrderLogs from "@src/app/components/OrderLogs/OrderLogs";
import PriceInfo from "@src/app/components/PriceInfo/PriceInfo";
import TokenInfo from "@src/app/components/TokenInfo/TokenInfo";
import UserWalletInfo from "@src/app/components/UserWalletInfo/UserWalletInfo";
import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import useExitPrompt from "@src/common/hooks/useExitPrompt";
import {
  useGetBuyOrderQuery,
  useSendReviewingNotificationMutation,
} from "@src/lib/redux/services/adminApi";

type BuyOrderPageProps = {
  params: {
    id: number;
  };
};

export default function BuyOrderPage({ params }: BuyOrderPageProps) {
  const router = useRouter();

  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  const { data, isSuccess, isError } = useGetBuyOrderQuery(params.id, {
    refetchOnMountOrArgChange: true,
  });

  const [sendReviewingNotification] = useSendReviewingNotificationMutation();

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

  return (
    <>
      {data ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <OrderActions
            id={params.id}
            type={OrderTypeEnum.BUY}
            orderStatus={data.orderStatus}
          />

          <OrderInfo
            data={{
              orderCode: data.orderCode,
              orderStatus: data.orderStatus,
              orderType: data.orderType,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <TokenInfo
                title="Receiving Token"
                tokenData={data.receivingToken}
              />

              <PriceInfo priceData={data.priceData} />
            </Box>
          </OrderInfo>

          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <UserWalletInfo userWalletInfo={data.userWalletInfo} />

            <BankAccountInfo bankAccountInfo={data.companyBankAccount} />
          </Box>

          <OrderLogs id={params.id} />
        </Box>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
