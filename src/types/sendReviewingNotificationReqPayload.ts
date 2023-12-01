import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";

export type SendReviewingNotificationReqPayload = {
  id: number;
  reviewingNotificationType: NotificationTypeEnum;
};
