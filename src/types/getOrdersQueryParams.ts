import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";

export type GetOrdersQueryParams = {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
  orderStatuses?: OrderStatusEnum[];
  orderTypes?: OrderTypeEnum[];
  incomingAssets?: string[];
  outgoingAssets?: string[];
};
