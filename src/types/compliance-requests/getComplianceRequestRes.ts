import { EmploymentStatus } from "@src/common/emuns/EmploymentStatusEnum";
import { UserVerificationRequestStatusEnum } from "@src/common/emuns/UserVerificationRequestStatusEnum";
import { ComplianceRecord } from "@src/types/compliance-records/complianceRecord";

type File = {
  id: number;
  key: string;
};

export type GetComplianceRequestRes = {
  id: number;
  sender: string;
  createdAt: string;
  status: UserVerificationRequestStatusEnum;
  sowCompleted: boolean;
  socCompleted: boolean;
  sowAnnualIncome: number;
  sowEmploymentStatus: EmploymentStatus;
  sowEstimatedNetWorth: number;
  sowSourceOfNetWorth: string;
  socCryptoExperience: string;
  socCryptoValue: number;
  socIntentionToSell: string;
  admin: {
    id: number;
    email: string;
  };
  user: {
    id: number;
    email: string;
    timezone: string;
    currencyCode: string;
    complianceRecords: ComplianceRecord[];
  };
  sowFiles: File[];
  socFiles: File[];
};
