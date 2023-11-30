import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import { ProcessOrderActionEnum } from "@src/types/processOrderActionEnum";

export type ProcessOrderReqPayload = {
  id: number;
  type: OrderTypeEnum;
  action: ProcessOrderActionEnum;
};
