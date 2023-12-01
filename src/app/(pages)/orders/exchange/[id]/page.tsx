"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import CompanyWalletInfo from "@src/app/components/CompanyWalletInfo/CompanyWalletInfo";
import OrderActions from "@src/app/components/OrderActions/OrderActions";
import OrderInfo from "@src/app/components/OrderInfo/OrderInfo";
import OrderLogs from "@src/app/components/OrderLogs/OrderLogs";
import PriceInfo from "@src/app/components/PriceInfo/PriceInfo";
import TokenInfo from "@src/app/components/TokenInfo/TokenInfo";
import UserWalletInfo from "@src/app/components/UserWalletInfo/UserWalletInfo";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import { useGetExchangeOrderQuery } from "@src/lib/redux/services/adminApi";

type ExchangeOrderPageProps = {
  params: {
    id: number;
  };
};

export default function ExchangeOrderPage({ params }: ExchangeOrderPageProps) {
  const router = useRouter();

  const { data, isError } = useGetExchangeOrderQuery(params.id);

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
            type={OrderTypeEnum.EXCHANGE}
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
