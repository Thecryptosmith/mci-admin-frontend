import { UserLimitTypeEnum } from "@src/common/emuns/UserLimitTypeEnum";

export type UserLimit = {
  sofLimitType: UserLimitTypeEnum;
  sofOrderLimit: number;
  sofTradingLimit: number;
  socLimitType: UserLimitTypeEnum;
  socOrderLimit: number;
  socTradingLimit: number;
};
