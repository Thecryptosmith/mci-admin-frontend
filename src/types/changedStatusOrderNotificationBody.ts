import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";

export type ChangedStatusOrderNotificationBody = {
  newOrderStatus: OrderStatusEnum;
  orderId: string;
};

export type ChangedStatusOrdersNotification = {
  type: NotificationTypeEnum;
  body: ChangedStatusOrderNotificationBody;
};
