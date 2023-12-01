import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";

export type NotificationData = {
  type: NotificationTypeEnum;
  body: Record<number, { orderId: string; reviewingEmail: string }>;
};
