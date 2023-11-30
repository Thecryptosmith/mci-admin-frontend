"use client";

import Box from "@mui/material/Box/Box";
import BankAccountInfo from "@src/app/components/BankAccountInfo/BankAccountInfo";
import CompanyWalletInfo from "@src/app/components/CompanyWalletInfo/CompanyWalletInfo";
import OrderActions from "@src/app/components/OrderActions/OrderActions";
import OrderInfo from "@src/app/components/OrderInfo/OrderInfo";
import OrderLogs from "@src/app/components/OrderLogs/OrderLogs";
import TokenInfo from "@src/app/components/TokenInfo/TokenInfo";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import { useGetSellOrderQuery } from "@src/lib/redux/services/adminApi";

type SellOrderPageProps = {
  params: {
    id: number;
  };
};

export default function SellOrderPage({ params }: SellOrderPageProps) {
  const { data } = useGetSellOrderQuery(params.id);

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
