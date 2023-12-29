import { EmploymentStatus } from "@src/common/emuns/EmploymentStatusEnum";
import { UserVerificationRequestStatusEnum } from "@src/common/emuns/UserVerificationRequestStatusEnum";

type File = {
  id: number;
  key: string;
};

export type GetComplianceRequestRes = {
  id: number;
  createdAt: string;
  updatedAt: string;
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
  user: {
    id: number;
    email: string;
    referralId: null;
    customerId: string;
    timezone: string;
    currencyCode: string;
  };
  sowFiles: File[];
  socFiles: File[];
};
