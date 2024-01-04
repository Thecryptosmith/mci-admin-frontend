import { EmploymentStatus } from "@src/common/emuns/EmploymentStatusEnum";

export type ComplianceRequest = {
  sowAnnualIncome?: number;
  sowEmploymentStatus?: EmploymentStatus;
  sowEstimatedNetWorth?: number;
  sowSourceOfNetWorth?: string;
  sowFiles?: any[];
  socCryptoExperience?: string;
  socCryptoValue?: number;
  socIntentionToSell?: string;
  socFiles?: any[];
};
