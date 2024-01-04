import { UserLimitTypeEnum } from "@src/common/emuns/UserLimitTypeEnum";

export type ComplianceRecord = {
  id: number;
  createdAt: string;
  sofComment: string | null;
  socComment: string | null;
  admin: {
    id: number;
    email: string;
  };
  userVerificationRequest: {
    id: number;
  };
  userLimit: {
    id: number;
    sofLimitType: UserLimitTypeEnum;
    sofOrderLimit: number;
    sofTradingLimit: number;
    socLimitType: UserLimitTypeEnum;
    socOrderLimit: number;
    socTradingLimit: number;
  };
};
