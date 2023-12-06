import { UserWalletStatusEnum } from "@src/common/emuns/UserWalletStatusEnum";

export type ChangeUserWalletStatusReqPayload = {
  id: number;
  status: UserWalletStatusEnum;
};
