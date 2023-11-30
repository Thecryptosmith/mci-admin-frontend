import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";

export type OrderType = {
  orderId: number;
  orderType: "buy" | "sell" | "exchange";
  date: string;
  status: OrderStatusEnum;
  incomingAsset: string;
  incomingAmount: string;
  outgoingAsset: string;
  outgoingAmount: string;
};

export type GetOrdersRes = {
  orders: OrderType[];
  count: number;
};
