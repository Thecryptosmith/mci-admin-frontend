import { UserLimitTypeEnum } from "@src/common/emuns/UserLimitTypeEnum";
import { ComplianceDocument } from "@src/types/compliance-records/complianceDocument";
import { ComplianceToken } from "@src/types/compliance-records/complianceToken";

export type FullComplianceRecord = {
  complianceRecord: {
    id: number;
    createdAt: string;
    sofComment: string | null;
    socComment: string | null;
    user: {
      id: number;
      email: string;
    };
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
    complianceDocuments: ComplianceDocument[];
    complianceTokens: ComplianceToken[];
  };
};
