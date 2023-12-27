import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";

export type ChangeOrderStatusReqPayload = {
  id: number;
  type: "exchange" | "buy" | "sell";
  status: OrderStatusEnum;
};
