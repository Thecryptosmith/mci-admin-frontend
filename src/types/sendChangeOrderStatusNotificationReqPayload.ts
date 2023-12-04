import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";

export type SendChangeOrderStatusNotificationReqPayload = {
  id: number;
  newStatus: OrderStatusEnum;
};
