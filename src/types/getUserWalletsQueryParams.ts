import { UserWalletStatusEnum } from "@src/common/emuns/UserWalletStatusEnum";

export type GetUserWalletsQueryParams = {
  limit?: number;
  offset?: number;
  status?: UserWalletStatusEnum[];
};
